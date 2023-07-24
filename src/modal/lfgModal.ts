import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputComponent, TextInputStyle } from "discord.js";

export class LfgModal
{
    build(): ModalBuilder
    {
        const modal = new ModalBuilder();
        modal.setTitle('Looking for Group').setCustomId('lfgmodal');

        const url = new TextInputBuilder();
        url.setCustomId('url')
            .setLabel('Enter a steam game Url')
            .setStyle(TextInputStyle.Short);

        const information = new TextInputBuilder();
        information.setCustomId('information')
                    .setLabel('Tell us all what u want or search')
                    .setStyle(TextInputStyle.Paragraph);

        const one = new ActionRowBuilder<TextInputBuilder>().addComponents(url);
        const two = new ActionRowBuilder<TextInputBuilder>().addComponents(information);

        modal.addComponents(one,two)
        return modal;
    }
}