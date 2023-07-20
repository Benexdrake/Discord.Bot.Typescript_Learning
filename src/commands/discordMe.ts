import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../client/Command";


export default new Command(
{
    name: "me",
    description: "show my discord profile",
        
    run: async ({ interaction }) => 
    {
        const user = interaction.user;

        
    }
});

