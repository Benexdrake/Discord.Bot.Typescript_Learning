import { Colors, EmbedBuilder} from "discord.js";
import { TwitchUser } from "../models/twitch/twitchUser";
export class TwitchEmbed
{
    public build(user: TwitchUser) : EmbedBuilder
    {
        const embed = new EmbedBuilder();
        try 
        {
            embed.setAuthor({
                iconURL: 'https://img.freepik.com/vektoren-premium/twitch-logo_578229-259.jpg?w=500',
                name: user.displayName,
                url: 'https://www.twitch.tv/' + user.login
            })
            
            .setColor(Colors.Purple)
            .setDescription(user.description)
            .setImage(user.offlineImageUrl || 'https://www.gamepur.com/wp-content/uploads/2022/12/featured-best-games-to-stream-on-twitch.jpg?w=1024')
            .setFooter({text: 'Follows: ' + user.follower})
            .setThumbnail(user.profileImageUrl || 'https://www.gamepur.com/wp-content/uploads/2022/12/featured-best-games-to-stream-on-twitch.jpg?w=1024');

            if(user.viewCount > 0)
            {
                embed.setFields([
                {
                    name: 'Views',
                    value: user.viewCount.toLocaleString(),
                    inline: true
                }])
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
            return embed;
    }
}