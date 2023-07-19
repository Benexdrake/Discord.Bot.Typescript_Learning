import axios from "axios";
import { SteamID } from "../models/steamID";
import { Game } from "../models/steamGame";
import { SteamUser } from "../models/steamUser";

const {steam} = require('../../config.json');

export class Steam_API
{
    async GetSteamGameIDs() : Promise<SteamID[]>
    {
        let steamids:SteamID[] = [];

        await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json')
        .then(async response =>
        {
            steamids = response.data.applist.apps;
        });
        return steamids;
    }

    async GetSteamGame(id:string) : Promise<Game>
    {
        let steamGame = new Game();

        await axios.get('https://store.steampowered.com/api/appdetails?appids='+id)
        .then(async response => 
        {
            steamGame = response.data[`${id}`].data;
        });
        return steamGame;
    }

    async ConvertUsernameToID(url:string) : Promise<string>
    {
        let r = url.split('/')[4];;
        
        if(url.includes('https://steamcommunity.com/id/'))
        {    
           r = await axios.get(url+'?xml=1').then(x => {
                const response = x.data as string;
                return response.split('<')[3].split('>')[1];
            });
        }
        return r;
    }

    async GetSteamUserProfile(id:string) : Promise<SteamUser>
    {
        const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steam}&steamids=${id}`;
        return await axios.get(url).then(async x => {

            const games = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steam}&steamid=${id}&format=json`).then(x => {
                return x.data.response.game_count;
            })
            let user = new SteamUser();
            user.username = x.data.response.players[0].personaname;
            user.games = games;
            user.avatarUrl = x.data.response.players[0].avatarfull;
            user.country = x.data.response.players[0].loccountrycode;
            user.profileUrl = x.data.response.players[0].profileurl;
            user.created = new Date(x.data.response.players[0].timecreated * 1000);
            user.lastLogoff = new Date(x.data.response.players[0].lastlogoff * 1000);
            
            return user;
        });
    }
}

