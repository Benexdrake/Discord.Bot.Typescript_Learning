import axios from "axios";
import https from 'https'
import { Anime } from "../models/Crunchyroll/anime";

export class Crunchyroll_API
{
    async GetAnimeByUrl(url:string) : Promise<Anime>
    {
        const instance = axios.create({
            httpsAgent: new https.Agent({
              rejectUnauthorized: false
            })
          });
        const id = url.split('/')[5];
        const anime = await instance.get(`http://localhost:5000/api/Crunchyroll/id?id=${id}`).then(x => {return x.data});
        return anime;
    }
}