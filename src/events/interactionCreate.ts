import { APITextInputComponent, CommandInteractionOptionResolver, ModalSubmitInteraction } from "discord.js";
import { client } from "..";
import { Event } from "../client/Event";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";
import { LfgLogic } from "../logic/lfgLogic";
import { LfgModal } from "../modal/lfgModal";

export default new Event("interactionCreate", async (interaction) => {    
    // Chat Input Commands
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if(command?.name !== 'lfgmodal')
            await interaction.reply('Please wait');
        if (!command)
            return interaction.followUp("You have used a non existent command");
        
        if(interaction.options.data[0]?.value !== undefined)
            console.log(`>>> ${interaction.user.username} used ${command.name} with ${interaction.options.data[0].value}`)
        else
            console.log(`>>> ${interaction.user.username} used ${command.name}`)

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }

    if(interaction.isModalSubmit())
    {
        if (interaction.customId === 'lfgmodal')
        {
            await new LfgLogic().LFGModalCommand(interaction);
        }
    }

    if(interaction.isButton())
    {
        if(interaction.customId === 'lfg')
        {
            const modal = new LfgModal().build();
            await interaction.showModal(modal);
        }
    }

});
