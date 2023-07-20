import { Colors, EmbedBuilder} from "discord.js";
import {Game} from "../models/Steam/steamGame";

export class SteamGameEmbed
{
    public build(game:Game) : EmbedBuilder
    {
        const embed = new EmbedBuilder();
        try 
        {
            let genres = "";
            let publisher = "";
            let developers = "";
            let categories = "";

            game.genres.forEach(x => genres += x.description + ", ");
            game.publishers.forEach(x => publisher += x + ", ");
            game.developers.forEach(x => developers += x + ", ");
            game.categories.forEach(x => categories += x.description + ", ");

            embed.setAuthor({
                iconURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/768px-Steam_icon_logo.svg.png',
                name: game.name,
                url: 'https://store.steampowered.com/app/' + game.steam_appid
            })
            .setColor(Colors.Red)
            .setDescription(game.short_description)
            .setImage(game.header_image)
            .setFooter({
                text: game.legal_notice
            })
            .setFields([
            {
                name: 'Price',
                value: game.price_overview.final_formatted,
                inline:true
            },
            {
                name: 'Archievments',
                value: game.achievements?.total?.toLocaleString() || '0',
                inline:true
            },
            {
                name: 'Release Date',
                value: game.release_date.date
            },
            {
                name: 'Publisher',
                value: publisher.slice(0,-2),
                inline: true
            },
            {
                name: 'Developers',
                value: developers.slice(0,-2),
                inline:true
            },
            {
                name: 'Genres',
                value: genres.slice(0,-2)
            },
            {
                name: 'Categories',
                value: categories.slice(0,-2)
            },
            {
                name: 'Website',
                value: game.website
            },
            {
                name: 'DLC`s',
                value: game.dlc?.length?.toLocaleString() || '0'
            }]);


        } 
        catch (error) 
        {
            console.log(error)    
        }
        return embed;
    }
}