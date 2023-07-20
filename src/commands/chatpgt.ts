import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../client/Command";
import { ChatGPTLogic } from "../logic/chatGPTLogic";

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
        await new ChatGPTLogic().chatGPT(interaction);
    }
});