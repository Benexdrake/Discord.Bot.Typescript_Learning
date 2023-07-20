import { Twitch_API } from "../controllers/twitch_API";
import { TwitchEmbed } from "../embeds/twitchEmbed";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

export class TwitchLogic
{
    async Twitch(interaction:ExtendedInteraction)
    {
        const twitchEmbed = new TwitchEmbed();
        const twitchAPI = new Twitch_API();

        let value = interaction.options.data[0].value?.toLocaleString() || '';
        if(value.includes('https://www.twitch.tv/'))
        {
            value = value.split('/')[3]
        }
        
        const user = await twitchAPI.GetTwitchUser(value)   
        
        if(user.login !== '')
        {
            const embed = twitchEmbed.build(user);
            interaction.followUp({embeds:[embed]});
        }
        else
        interaction.followUp(`Cant find User: ${value}`)
    }
}