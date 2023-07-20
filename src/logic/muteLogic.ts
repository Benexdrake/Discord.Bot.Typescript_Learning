import { VoiceChannel } from "discord.js";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

export class MuteLogic
{
    async Mute(interaction:ExtendedInteraction)
    {
        const voiceChannel = await interaction.client.channels.fetch('1073155921888415784') as VoiceChannel;
        
        const members = voiceChannel.members;
        
        const value = interaction.options.data[0].value as boolean;
        
        members.forEach(x => x.voice.setMute(value));
        
        if(value === true)
        interaction.followUp('mute on');
        else
        interaction.followUp('mute off');
    }
}