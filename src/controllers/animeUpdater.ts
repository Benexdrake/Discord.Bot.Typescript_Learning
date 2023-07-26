import { Message } from "discord.js";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";
import { Anime } from "../models/Crunchyroll/anime";
import puppeteer, { ElementHandle, Page } from 'puppeteer';

export class AnimeUpdater
{
    async Start(message:Message,dir:string) : Promise<Anime[]>
    {
        

        let animes:Anime[] = [];
        const browser = await puppeteer.launch({headless: true});
        const page:Page = await browser.newPage();
        await page.setViewport({width: 0, height: 0, deviceScaleFactor: 1});
        
        const response = await fetch(dir);
        const data = await response.text();

        await page.setContent(data)

        const browserCards = await page.$$("div.browse-card");
        
        
        await message.edit(`Looking for Data in File`);
        let n = 0;
        for(const card of browserCards)
        {
            n++;
            if(n % 100 === 0)
                message.edit(`Looking for Data in File - ${n}/${browserCards.length}`)
            const anime = await this.GetAnime(card);
            if(anime.title !== '')
                animes.push(anime);
        }
        browser.close();
        browser.disconnect();
        return animes;
    }

    async GetAnime(card:ElementHandle<HTMLDivElement>) : Promise<Anime>
    {
        let a:Anime = new Anime();

        const bcUrl = await card.$$("a.browse-card__poster-wrapper--pU-AW");
        const bcUrlText = await bcUrl[0]?.evaluate(x => x.outerHTML);
        const bcUrlTextSplit = bcUrlText.split('"');

        const hover = await card.$$("div.browse-card-hover__series-meta--hgyIc");
        if(hover.length > 0)
        {   
            const hoverMeta = await hover[0]?.$$("span.text--gq6o-");
            if(hoverMeta.length > 0)
            {
                // id
                a._id = bcUrlTextSplit[3].split('/')[3];
                // title
                const browserCardTitle = await card.$$('a.browse-card__title-link--SLlRM');
                a.title = await browserCardTitle[0]?.evaluate(x => x.innerText) || ""
                //url
                a.url = "https://www.crunchyroll.com"+bcUrlTextSplit[3] || "";
                //imageurl
                const imageUrl = await card.$$('img.content-image__image--7tGlg');
                const imageUrlText = (await imageUrl[0]?.evaluate(x => x.outerHTML));
                if(imageUrlText !== undefined)
                a.imageUrl = imageUrlText.split('"')[3].replace('240x360','480x720') || "";
                //rating
                const rating = await card.$$('p.star-rating-short-static__rating--bdAfR')
                const ratingText = await rating[0].evaluate(x => x.innerText);
                a.rating = parseFloat(ratingText) || 0;
                //information
                const information = await card.$$('h4.browse-card-hover__description');
                if(information.length === 0)
                {
                    const newInformation = await card.$$('h4.browse-card-hover__description--e28NH');
                    a.description = await newInformation[0]?.evaluate(x => x.innerText)
                }
                else
                a.description = await information[0]?.evaluate(x => x.innerText)
                //language
                const language = await card.$$('span.meta-tags__tag--W4JTZ')
                a.language = await language[0]?.evaluate(x => x.innerText) || ""
                //Season 0
                const seasonText = await hoverMeta[0]?.evaluate(x => x?.innerText);
                a.seasons = parseInt(seasonText.split(' ')[0].replace('.','')) || 0;
                //Episode 1
                const episodeText = await hoverMeta[1]?.evaluate(x => x?.innerText);
                a.episodes = parseInt(episodeText.split(' ')[0].replace('.','')) || 0;
            }
        }
        return a;
    }
}