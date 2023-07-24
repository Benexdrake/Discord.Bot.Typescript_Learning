import { Command } from "../client/Command";
import { LfgButton } from "../buttons/lfgButton";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default new Command(
{
    name: "createlfgbutton",
    description: "create",

        
    run: async ({ interaction }) => 
    {
        const lfgbutton = new LfgButton().Build();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(lfgbutton);

		await interaction.followUp({
			content: `Test`,
			components: [row],
		});
    }
});