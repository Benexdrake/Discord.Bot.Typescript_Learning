import axios from "axios";
import { Embed, EmbedBuilder, Message, TextBasedChannel } from "discord.js";
import https from 'https'
import { StickyDB } from "../data/stickyDb";

export class StickyMessage
{
    private async CreateMessage(interaction: Message)
    {
        const instance = axios.create({
            httpsAgent: new https.Agent({
              rejectUnauthorized: false
            })
          });
        const message = await interaction.channel?.send({embeds:[{title: 'New Sticky Message', description: 'Im a Demo Sticky yo!'}]});
        console.log(message.id);
        //await instance.post('https://localhost:5000/api/StickyMessage',{id:message.id.toString()});
    }
    async Message(interaction: Message)
    {
        //const db = new StickyDB();
        //db.Connect();

        //const instance = axios.create({
        //    httpsAgent: new https.Agent({
        //      rejectUnauthorized: false
        //    })
        //  });
        //let messageId = "";
        //await instance.get('https://localhost:5000/api/StickyMessage').then(x => {
        //    messageId = x.data.id
        //    console.log(x.data)
        //})
        //const channel = interaction.channel as TextBasedChannel;
        //if(messageId === undefined)
        //{
        //    this.CreateMessage(interaction);
        //    return;
        //}
        //const message = await channel.messages.fetch(stickymessageid).then(x => {return x});
        //if(message === null)
        //    return;
        //const embed = new EmbedBuilder({title: 'Copy Sticky Message', description: 'Im a Demo Sticky yo!'});
        //
        //await message?.delete();   
        //
        //const newMessage = await channel.send({embeds:[embed]});
        
        //new JsonConvert().CreateConfig(token,guildId,newMessage?.id,stickymessagechannel)
    }
}