import { ChatGPT_API } from "../controllers/chatGPT_API";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

export class ChatGPTLogic
{
    async chatGPT(interaction:ExtendedInteraction)
    {
        const gpt = new ChatGPT_API();
        const value = interaction.options.data[0].value?.toLocaleString() as string;
        const response = await gpt.sendOpenAIRequest(value);
        interaction.followUp(response);
    }
}