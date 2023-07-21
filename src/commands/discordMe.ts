import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../client/Command";
import { DiscordUserEmbed } from "../embeds/discordUserEmbed";
import axios from "axios";
const {token} = require('../../config.json');


export default new Command(
{
    name: "me",
    description: "show my discord profile",
        
    run: async ({ interaction }) => 
    {
        const member = interaction.member;
        
        const url = `https://discord.com/api/v9/users/${member.id}`;
        
        const headers = 
        {
            'Authorization': `Bot ${token}`
        };
        
        const displayname = await axios.get(url, {headers}).then(x => {
            
            return x.data.display_name
        }); 
        
        const embed = new DiscordUserEmbed().Build(member,displayname);
        interaction.followUp({embeds:[embed],content: `<@${member.id}>`});
    }
});

