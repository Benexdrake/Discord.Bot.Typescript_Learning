import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../client/Command";
import { Discord } from "../logic/discord";



export default new Command(
{
    name: "me",
    description: "show my discord profile",
        
    run: async ({ interaction }) => 
    {
        await new Discord().GetUser(interaction);
    }
});

