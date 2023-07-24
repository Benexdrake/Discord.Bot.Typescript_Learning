import { ApplicationCommandOptionType, ForumChannel, GuildTextThreadManager, MessagePayload, ThreadChannel } from "discord.js";
import { Command } from "../client/Command";
import { LfgModal } from "../modal/lfgModal";

export default new Command(
{
    name: "lfgmodal",
    description: "looking for group",
        
    run: async ({ interaction }) => 
    {
        const modal = new LfgModal().build();
        await interaction.showModal(modal);
    }
});