import { ApplicationCommandOptionType, ForumChannel, GuildTextThreadManager, MessagePayload, ThreadChannel } from "discord.js";
import { Command } from "../client/Command";
import { LfgLogic } from "../logic/lfgLogic";
import { LfgModal } from "../modal/lfgModal";

export default new Command(
{
    name: "lfg",
    description: "looking for group",
    options: [
        {
            name: 'url',
            description:'please enter a steam game url',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'message',
            description:'enter a message',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        
    run: async ({ interaction }) => 
    {

            await new LfgLogic().lfgCommand(interaction);
    }
});