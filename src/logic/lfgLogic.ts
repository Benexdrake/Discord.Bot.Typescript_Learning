import { AnyThreadChannel, ForumChannel } from "discord.js";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

import { Steam_API } from "../controllers/steam_API";
import { SteamGameEmbed } from "../embeds/steamGameEmbed";

const {discord} = require('../../config.json');

export class LfgLogic
{
    async lfgCommand(interaction:ExtendedInteraction)
    {
        const channel = await interaction.guild?.channels.fetch(discord.lfgId).then(x => {return x as ForumChannel})

        let title = "";
        let message = "";

        for(const option of interaction.options.data)
        {
            if(option.name === 'url')
                title = option.value?.toString() || "";
            else if(option.name === 'message')
                message = option.value?.toString() || "";
        }
        const thread = await channel?.threads.create({
            name: title,
            message: {content: message}
        });

        interaction.followUp({content: 'Thread created!',ephemeral: true});
    }
    
    async LfgThreadCreated(thread: AnyThreadChannel)
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
    }
}