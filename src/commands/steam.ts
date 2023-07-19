import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../client/Command";
import { Steam_API } from "../controllers/steam_API";
import { SteamGameEmbed } from "../embeds/steamGameEmbed";

export default new Command(
{
    name: "steam",
    description: "steam api",
    options: [
        {
            name: 'url',
            description:'enter a steam game url',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'user',
            description: 'enter a steam user url',
            type: ApplicationCommandOptionType.String
        }],
        
    run: async ({ interaction }) => 
    {
        const steam_API = new Steam_API();
        const url = interaction.options.data[0]?.value as string;

        if(interaction.options.data[0].name === 'url')
        {
            if(url.includes('https://store.steampowered.com/app/'))
            {
                const id = url.split('/')[4]
                const steamgame = await steam_API.GetSteamGame(id);
                
                const embed = new SteamGameEmbed().build(steamgame);
                
                interaction.followUp({embeds:[embed]});
            }
            else
            interaction.followUp('Please enter a real Steam Url');
        }
        else if(interaction.options.data[0].name === 'user')
        {
            const id = await steam_API.ConvertUsernameToID(url);
            const user = await steam_API.GetSteamUserProfile(id);
            interaction.followUp(user);
        }
    }
});