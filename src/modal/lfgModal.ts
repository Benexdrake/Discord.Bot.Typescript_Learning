import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputComponent, TextInputStyle } from "discord.js";

export class LfgModal
{
    build(): ModalBuilder
    {
        const modal = new ModalBuilder();
        modal.setTitle('Looking for Group').setCustomId('lfgmodal');

        const title = new TextInputBuilder();
        title.setCustomId('title')
            .setLabel('Enter a Title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);


        const url = new TextInputBuilder();
        url.setCustomId('url')
            .setLabel('Enter a steam game Url')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
            .setPlaceholder('https://store.steampowered.com/app/000000/XXXXXX');

        const information = new TextInputBuilder();
        information.setCustomId('information')
                    .setLabel('Tell us all what u want or search')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);

        const a = new ActionRowBuilder<TextInputBuilder>().addComponents(title);
        const b = new ActionRowBuilder<TextInputBuilder>().addComponents(url);
        const c = new ActionRowBuilder<TextInputBuilder>().addComponents(information);

        modal.addComponents(a,b,c);
        return modal;
    }
}