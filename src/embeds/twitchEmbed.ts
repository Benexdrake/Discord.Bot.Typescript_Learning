import { Colors, EmbedBuilder} from "discord.js";
import { TwitchUser } from "../models/twitch/twitchUser";
import { validateHeaderName } from "http";
export class TwitchEmbed
{
    public build(user: TwitchUser) : EmbedBuilder
    {
        const embed = new EmbedBuilder();
        try 
        {
            const dateString = user.startedAt?.toString();
            const dateDate = new Date(dateString);
            const date = dateDate.toLocaleDateString();


            embed.setAuthor({
                iconURL: 'https://img.freepik.com/vektoren-premium/twitch-logo_578229-259.jpg?w=500',
                name: user.displayName,
                url: 'https://www.twitch.tv/' + user.login
            })
            .setColor(Colors.Purple)
            .setDescription(user.description)
            .setImage(user.offlineImageUrl || 'https://www.gamepur.com/wp-content/uploads/2022/12/featured-best-games-to-stream-on-twitch.jpg?w=1024')
            .setFooter({text: 'Follows: ' + user.follower})
            .setThumbnail(user.profileImageUrl || 'https://www.gamepur.com/wp-content/uploads/2022/12/featured-best-games-to-stream-on-twitch.jpg?w=1024')

            if(user.gamename !== undefined)
            {
                embed.setFields([
                {
                    name: '‎',
                    value: 'Live 🔴'
                },
                {
                    name: 'Language',
                    value: `:flag_${user.language}:`
                },
                {
                    name: 'Title',
                    value: user.gameTitle,
                },
                {
                    name: 'Viewer',
                    value: user.viewerCount?.toString()
                },
                {
                    name: 'Category',
                    value: user.gamename,
                    inline: true
                },
                {
                    name: 'Started at',
                    value: date
                },
                {
                    name: 'Tags',
                    value: user.tags?.join(', ')
                }
                    ]);
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
            return embed;
    }
}