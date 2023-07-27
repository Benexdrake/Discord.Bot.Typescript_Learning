import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../client/Command";
import { ChatGPTLogic } from "../logic/chatGPTLogic";
import { StickyMessage } from "../logic/stickyMessage";

export default new Command(
{
    name: "createstickymessage",
    description: "creating a sticky message",
    options: [
        {
            name: 'messageid',
            description:'insert messageid',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        defaultMemberPermissions: PermissionFlagsBits.Administrator,
        
    run: async ({ interaction }) => 
    {
        let messageId = interaction?.options?.data[0].value as string;
        let channelId = interaction.channelId;
        new StickyMessage().AddMessage(channelId,messageId);

        await interaction.deleteReply();
    }
});