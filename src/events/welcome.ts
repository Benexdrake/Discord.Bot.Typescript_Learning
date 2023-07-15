import { Event } from "../client/Event";
import { GuildMember, TextBasedChannel } from "discord.js";
import { WelcomeEmbed } from "../embeds/welcomeEmbed";
import { client } from "..";

export default new Event("guildMemberAdd", (member) => 
{
    if(member.roles.cache.some(role => role.name === 'Member'))
    {
        const channel = member.guild.channels.cache.get('1044857228697554975') as TextBasedChannel;
        const welcome = new WelcomeEmbed();
        const embed = welcome.buildWelcomeEmbed(member as GuildMember);
        
        channel.send({
            embeds: [embed],
            content: '<@'+member.id + '>'
        })
    }
});