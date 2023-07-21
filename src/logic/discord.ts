import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";
import { DiscordUserEmbed } from "../embeds/discordUserEmbed";
import axios from "axios";
const {discord} = require('../../config.json');

export class Discord
{
    async GetUser(interaction: ExtendedInteraction)
    {
        let id = "";
        const member = interaction.member;
        if(interaction.options.data[0].name === 'me')
        {
            id = member.id
        }
        else
        {
            const value = interaction.options.data[0].value as string;
            const user = interaction.client.users.cache.find(x => x.username.includes(value) || x.id.includes(value));
            if(user?.id !== undefined)
                id = user?.id;
        }

        if(id !== "")
        {
            const url = `https://discord.com/api/v9/users/${id}`;
            
            const headers = 
            {
                'Authorization': `Bot ${discord.token}`
            };
            
            const displayname = await axios.get(url, {headers}).then(x => {
                
                return x.data.display_name
            }); 
            
            const embed = new DiscordUserEmbed().Build(member,displayname);
            interaction.followUp({embeds:[embed],content: `<@${member.id}>`});
        }
        else
            interaction.followUp('Cant find User')
    }
}