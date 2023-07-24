import { Embed, EmbedBuilder, Message, TextBasedChannel } from "discord.js";

import { JsonConvert } from "../../json";

import { client } from "..";

export class StickyMessage
{
    private async CreateMessage(interaction: Message)
    {
        const {token, guildId, stickymessageid, stickymessagechannel}  = require('../../config.json');
        const message = await interaction.channel?.send({embeds:[{title: 'New Sticky Message', description: 'Im a Demo Sticky yo!'}]});
        
        new JsonConvert().CreateConfig(token,guildId,message.id,stickymessagechannel)
    }
    async Message(interaction: Message)
    {
        const {token, guildId, stickymessageid, stickymessagechannel}  = require('../../config.json');
        const channel = client.channels.cache.find(x => x.id === '1075713574527320064') as TextBasedChannel;

        if(stickymessageid === '')
        {
            this.CreateMessage(interaction);
            return;
        }

        const message = await channel.messages.fetch(stickymessageid).then(x => {return x});
        if(message === null)
            return;

        const embed = new EmbedBuilder({title: 'Copy Sticky Message', description: 'Im a Demo Sticky yo!'});
        
        await message?.delete();   
        
        const newMessage = await channel.send({embeds:[embed]});
        
        //new JsonConvert().CreateConfig(token,guildId,newMessage?.id,stickymessagechannel)
    }
}