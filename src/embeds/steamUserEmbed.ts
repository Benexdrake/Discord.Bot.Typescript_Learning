import { Colors, EmbedBuilder} from "discord.js";
import { SteamUser } from "../models/steamUser";

export class SteamUserEmbed
{
    
    public build(user:SteamUser) : EmbedBuilder
    {
        const embed = new EmbedBuilder();

        try 
        {
            embed.setAuthor({
                iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/768px-Steam_icon_logo.svg.png',
                name:user.username,
                url: user.profileUrl
            })
            .setColor(Colors.Blue)
            .setImage(user.avatarUrl)
            .setFields([
                {
                    name: 'Country',
                    value: user.country
                },
                {
                    name: 'Games',
                    value: user.games.toString()
                },
                {
                    name: 'Created',
                    value: user.created.toLocaleDateString()
                }
            ])
            .setFooter({
                text: `Last logoff: ${user.lastLogoff}`
            })    
        } 
        catch (error) 
        {
            console.log(error);
        }
        return embed;
    }
}