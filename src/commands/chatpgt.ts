import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../client/Command";
import { ChatGPT_API } from "../controllers/chatGPT_API";

export default new Command(
{
    name: "chatgpt",
    description: "ask a question to chatgpt",
    options: [
        {
            name: 'question',
            description:'insert a question',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        
    run: async ({ interaction }) => 
    {
        const gpt = new ChatGPT_API();
        const value = interaction.options.data[0].value?.toLocaleString() || '';
        const response = await gpt.sendOpenAIRequest(value);
        interaction.followUp(response);
    }
});