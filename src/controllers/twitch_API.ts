import { TwitchUser } from "../models/twitch/twitchUser";

const {twitch} = require('../../config.json');

import axios from 'axios';

export class Twitch_API
{
    async GetTwitchUser(username:string) : Promise<TwitchUser>
    {
        const user = new TwitchUser();
        const access_token = await axios.post('https://id.twitch.tv/oauth2/token?client_id='+twitch.clientid+'&client_secret='+twitch.clientsecret+'&grant_type=client_credentials')
        .then(async response => 
        {
            return response.data.access_token as string;
        })
        .catch(error => {console.log(error)});

        const headers = 
        {
            'Authorization': `Bearer ${access_token}`,
            'Client-ID': twitch.clientid
        };

        await axios.get('https://api.twitch.tv/helix/users?login=' + username, {headers})
        .then(async x => 
        {
            user.id = x.data.data[0].id;
            user.login = x.data.data[0].login;
            user.displayName = x.data.data[0].display_name;
            user.description = x.data.data[0].description;
            user.profileImageUrl = x.data.data[0].profile_image_url;
            user.offlineImageUrl = x.data.data[0].offline_image_url;
        }).catch(error => console.log(error));
                
        await axios.get('https://api.twitch.tv/helix/users/follows?to_id=' + user.id, {headers})
                .then(async x => 
                {
                    user.follower = x.data.total;
                }).catch(error => {console.log(error)});

        await axios.get(`https://api.twitch.tv/helix/streams?user_id=${user.id}`,{headers})
                .then(async x => 
                {
                    user.gamename = x.data.data[0]?.game_name;
                    user.gameTitle = x.data.data[0]?.title;
                    user.viewerCount = x.data.data[0]?.viewer_count;
                    user.startedAt = x.data.data[0]?.started_at;
                    user.tags = x.data.data[0]?.tags;
                    if(x.data.data[0]?.thumbnail_url !==  undefined)
                        user.offlineImageUrl = x.data.data[0]?.thumbnail_url.replace('{width}','1920').replace('{height}','1080');
                    user.language = x.data.data[0]?.language;
                })
        return user;
    }
}