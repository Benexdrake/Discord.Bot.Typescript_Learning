import { Command } from "../client/Command";
import { LfgButton } from "../buttons/lfgButton";
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, PermissionFlagsBits } from "discord.js";

export default new Command(
{
    name: "createlfgbutton",
    description: "create",
    options:[
        {
            name: 'button_text',
            description: 'insert a text for the button',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'description_text',
            description: 'insert a little description',
            type: ApplicationCommandOptionType.String
        }],
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
        
    run: async ({ interaction }) => 
    {
        const value1 = interaction.options.data[0]?.value as string;
        const value2 = interaction.options.data[1]?.value as string;

        const lfgbutton = new LfgButton().Build();

        let content = 'Create a LFG with a Modal';

        if(value1 !== undefined)
            lfgbutton.setLabel(value1)
        
        if(value2 !== undefined)
            content = value2;

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(lfgbutton);

		await interaction.followUp({
			content: content,
			components: [row],
		});
    }
});