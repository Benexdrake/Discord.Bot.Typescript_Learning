import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../client/Command";
import { ChatGPTLogic } from "../logic/chatGPTLogic";
import { Crunchyroll_API } from "../controllers/crunchyroll_API";
import { AnimeEmbed } from "../embeds/animeEmbed";

export default new Command(
{
    name: "crunchyroll",
    description: "show a anime from crunchyroll",
    options: [
        {
            name: 'url',
            description:'enter a crunchyroll url like https://www.crunchyroll.com/de/series/G63K98PZ6/one-punch-man',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        
    run: async ({ interaction }) => 
    {
        const value = interaction.options.data[0].value as string;
        const api = new Crunchyroll_API();

        const anime = await api.GetAnimeByUrl(value)
        if(anime !== undefined)
        {
            const embed = new AnimeEmbed().Build(anime);
            await interaction.followUp({embeds:[embed]})
        }
        else
            await interaction.followUp('Something was wrong with the Url')
    }
});