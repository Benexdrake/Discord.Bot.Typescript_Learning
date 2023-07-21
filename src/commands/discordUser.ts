import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../client/Command";
import { Discord } from "../logic/discord";



export default new Command(
{
    name: "discord_user",
    description: "show a discord profile",
    options: [{
        name: 'username',
        description:'enter a user name or id',
        type: ApplicationCommandOptionType.String,
    }],
        
    run: async ({ interaction }) => 
    {
        await new Discord().GetUser(interaction);
    }
});

