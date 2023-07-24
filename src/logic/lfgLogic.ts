import { AnyThreadChannel, ForumChannel, ModalSubmitInteraction } from "discord.js";
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
            if(option.name === 'title')
                title = option.value?.toString() || "";
            else if(option.name === 'url')
            {
                if(option.name.includes('https://store.steampowered.com/app/'))
                    title = option.value?.toString() || "";
                else
                message = option.value?.toString() || "";
            }
            else if(option.name === 'message')
                message += option.value?.toString() || "";
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
            const split = thread.name.split(';');
    
            const url = split.find(x => x.includes('https://store.steampowered.com/app/'));
            if(url !== undefined)
            {
                const game = await new Steam_API().GetSteamGame(url);
                const embed = new SteamGameEmbed().build(game);
    
                await thread.setName(game.name)
    
                await thread.send({content: `<@${thread.ownerId}>\nTitle: ${split[0]}`, embeds: [embed]})
            }
        }
        else
        {
            const nameSplit = thread.name.split(';');

            await thread.setName(nameSplit[0] || "Error");
    
            await thread.send({content: `<@${thread.ownerId}>\nUrl:${nameSplit[1] || "Error"}`})
        }
    }

    async LFGModalCommand(interaction:ModalSubmitInteraction)
    {
        const value0 = JSON.parse(JSON.stringify(interaction.components[0].components[0])).value as string;
        const value1 = JSON.parse(JSON.stringify(interaction.components[1].components[0])).value as string;
        const value2 = JSON.parse(JSON.stringify(interaction.components[2].components[0])).value as string;

        const channel = await interaction.guild?.channels.fetch(discord.lfgId).then(x => {return x as ForumChannel})

        await channel?.threads.create({
            name: `${value0};${value1}`,
            message: {content: value2}
        });
        interaction.reply({content: 'Thread created!',ephemeral: true});
    }
}