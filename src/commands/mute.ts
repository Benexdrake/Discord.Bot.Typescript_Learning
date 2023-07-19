import { Command } from "../client/Command";
import { ApplicationCommandOptionType, PermissionFlagsBits, VoiceChannel } from "discord.js";

export default new Command({
    name: "mute",
    description: "mute a member or all",
    options:
    [
        {
            name: 'mute',
            description:'mute all or unmute all',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        }
    ],
    defaultMemberPermissions: PermissionFlagsBits.MuteMembers,
    
    run: async ({ interaction }) => 
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
});