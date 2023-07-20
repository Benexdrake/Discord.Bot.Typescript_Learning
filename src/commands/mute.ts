import { Command } from "../client/Command";
import { ApplicationCommandOptionType, PermissionFlagsBits, VoiceChannel } from "discord.js";
import { MuteLogic } from "../logic/muteLogic";

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
        await new MuteLogic().Mute(interaction);
    }
});