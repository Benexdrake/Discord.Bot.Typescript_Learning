import { TwitchUser } from "../models/Steam/twitchUser";


const {twitch} = require('../../config.json');

import axios from 'axios';

export class Twitch_API
{
    async GetTwitchUser(username:string) : Promise<TwitchUser>
    {
        const user = new TwitchUser();

        await axios.post('https://id.twitch.tv/oauth2/token?client_id='+twitch.clientid+'&client_secret='+twitch.clientsecret+'&grant_type=client_credentials')
        .then(async response => 
        {
            const headers = 
            {
            'Authorization': `Bearer ${response.data.access_token}`,
            'Client-ID': twitch.clientid
            };

            await axios.get('https://api.twitch.tv/helix/users?login=' + username, {headers})
            .then(async x => 
            {
                if(x.data.length > 0)
                {
                    user.login = x.data.data[0].login;
                    user.displayName = x.data.data[0].display_name;
                    user.description = x.data.data[0].description;
                    user.profileImageUrl = x.data.data[0].profile_image_url;
                    user.offlineImageUrl = x.data.data[0].offline_image_url;
                    user.viewCount = x.data.data[0].view_count;
                    
                    await axios.get('https://api.twitch.tv/helix/users/follows?to_id=' + x.data.data[0].id, {headers})
                    .then(async x => 
                        {
                            user.follower = x.data.total;
                        }).catch(error => {console.log(error)});
                }
            }).catch(error => {console.log(error)});

        }).catch(error => console.log(error));

        return user;
    }
}