import { ApplicationCommandOptionType, Embed } from "discord.js";
import { Command } from "../client/Command";
import { TwitchLogic } from "../logic/twitchLogic";

export default new Command(
{
    name: "twitch",
    description: "get a twitch profile",
    options:
    [
        {
            name: 'user',
            description:'insert user name or url',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    
    run: async ({ interaction }) => 
    {
        await new TwitchLogic().Twitch(interaction);
    }
});