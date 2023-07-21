import { measureMemory } from "vm";
import { Event } from "../client/Event";
import { Steam_API } from "../controllers/steam_API";
import { SteamGameEmbed } from "../embeds/steamGameEmbed";

export default new Event('threadCreate', async (thread) => 
{
    if(thread.name.includes('https://store.steampowered.com/app/'))
    {
        const split = thread.name.split(' ');

        const url = split.find(x => x.includes('https://store.steampowered.com/app/'));
        if(url !== undefined)
        {
            const game = await new Steam_API().GetSteamGame(url);
            const embed = new SteamGameEmbed().build(game);

            await thread.setName(game.name)

            await thread.send({content: `<@${thread.ownerId}>`, embeds: [embed]})
        }
    }
});