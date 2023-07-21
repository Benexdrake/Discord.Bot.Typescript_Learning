import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../client/Command";
import { DiscordUserEmbed } from "../embeds/discordUserEmbed";


export default new Command(
{
    name: "me",
    description: "show my discord profile",
        
    run: async ({ interaction }) => 
    {
        const member = interaction.member;
        const embed = new DiscordUserEmbed().Build(member);
        //Avatar URL
        // Display Color Hex Color
        // Joined At
        // Roles
        // Name

        // Created At
        interaction.followUp({embeds:[embed]});
    }
});

