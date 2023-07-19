import { ApplicationCommandOptionType, Embed } from "discord.js";
import { Command } from "../client/Command";
import { TwitchEmbed } from "../embeds/twitchEmbed";
import { Twitch_API } from "../controllers/twitch_API";

export default new Command(
{
    name: "twitch",
    description: "get a twitch profile",
    options:
    [
        {
            name: 'username',
            description:'insert the name of the user',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    
    run: async ({ interaction }) => 
    {
        const twitchEmbed = new TwitchEmbed();
        const twitchAPI = new Twitch_API();

        const value = interaction.options.data[0].value?.toLocaleString() || '';

        const user = await twitchAPI.GetTwitchUser(value)

        const embed = twitchEmbed.build(user);
        interaction.followUp({embeds:[embed]});
    }
});