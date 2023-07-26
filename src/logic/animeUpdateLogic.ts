import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";
import { AnimeUpdater } from "../controllers/animeUpdater";
import axios from "axios";
import https from 'https'
import { Anime } from "../models/Crunchyroll/anime";

export class AnimeUpdateLogic
{
    async Update(interaction:ExtendedInteraction)
    {
        const value = interaction.options.data[0].attachment?.url as string;

        if(value !== undefined)
        {
            const animes:Anime[] = [];
            const message = await interaction.followUp('Please wait, updating Crunchyroll');

            const instance = axios.create({
                httpsAgent: new https.Agent({
                  rejectUnauthorized: false
                })
              });

            const updater = new AnimeUpdater();
            
            const loadAnimes = await updater.Start(message,value);

            await instance.get('https://localhost:5000/api/Crunchyroll',).then(x => 
            {
                for(const a of x.data)
                {
                    try 
                    {
                        const anime:Anime = new Anime();
                        anime._id = a._id;
                        anime.title = a.title;
                        anime.description = a.description;
                        anime.rating = a.rating;
                        anime.seasons = a.seasons;
                        anime.episodes = a.episodes;
                        anime.language = a.language;
                        anime.url = a.url;
                        anime.imageUrl = a.imageUrl;
                        anime.tags = a.tags;
                        anime.publisher = a.publisher;
                        animes.push(anime);    
                    } 
                    catch (error) 
                    {
                        console.error(error)   
                    }
                }    
            });
            
            let i = 0;
            await message.edit(`Now sending Data to DB`)
            for(const a of loadAnimes)
            {
                i++;
                if(i % 100 ===0)
                    await message.edit(`Sending Data to DB - ${i}/${loadAnimes.length}`)
                const anime = animes.find(x => x._id === a._id);
                
                if(anime !== undefined)
                {
                    if(anime?.tags !== undefined)
                        a.tags = anime?.tags;
                    if(anime?.publisher !== undefined)
                        a.publisher = anime?.publisher;
                    a.imageUrl = anime.imageUrl;
                }
                    await instance.post('https://localhost:5000/api/Crunchyroll',a);
            }
            message.edit('Done!!!')
        }
        else
        interaction.followUp('Something was wrong!')
    }
}