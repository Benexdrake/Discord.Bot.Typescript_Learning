import { ButtonBuilder, ButtonStyle } from "discord.js";

export class LfgButton
{
    Build() : ButtonBuilder
    {
        const lfg = new ButtonBuilder()
        lfg.setCustomId('lfg')
        .setLabel('Open LFG Modal')
        .setStyle(ButtonStyle.Primary);


        return lfg;
    }
}