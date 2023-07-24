import { Command } from "../client/Command";
import { LfgButton } from "../buttons/lfgButton";
import { ActionRowBuilder, ButtonBuilder, PermissionFlagsBits } from "discord.js";

export default new Command(
{
    name: "createlfgbutton",
    description: "create",
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
        
    run: async ({ interaction }) => 
    {
        const lfgbutton = new LfgButton().Build();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(lfgbutton);

		await interaction.followUp({
			content: `Create a LFG with a Modal`,
			components: [row],
		});
    }
});