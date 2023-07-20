import { GuildMember, TextBasedChannel } from "discord.js";
import { WelcomeEmbed } from "../embeds/welcomeEmbed";

export class WelcomeLogic
{
    async Welcome(member: GuildMember)
    {
        const channel = member.guild.channels.cache.get('1044857228697554975') as TextBasedChannel;
        const welcome = new WelcomeEmbed();
        const embed = welcome.buildWelcomeEmbed(member as GuildMember);
        
        channel.send({
            embeds: [embed],
            content: '<@'+member.id + '>'
        })
    }
}