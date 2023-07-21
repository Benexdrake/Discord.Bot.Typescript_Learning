import { EmbedBuilder, GuildMember } from "discord.js";
import { join } from "path";

export class DiscordUserEmbed
{
    Build(member: GuildMember, display_name:string) : EmbedBuilder
    {
        const embed = new EmbedBuilder();

        const roles = member.roles.cache.map((role) => role.toString());

        const role = roles.join(', ')

        embed
        .setAuthor({
            iconURL: member.user.displayAvatarURL(),
            name: display_name
        })
        .setTitle(member.displayName)
        .setColor(member.displayHexColor)
        .setImage(member.displayAvatarURL())
        .setFields([
        {
            name: 'Joined At',
            value: member.joinedAt?.toLocaleDateString() || ''
        },
        {
            name: 'Created At',
            value: member.user.createdAt.toLocaleDateString()
        },
        {
            name: 'Roles',
            value: role
        }
        ])

        return embed;
    }
}