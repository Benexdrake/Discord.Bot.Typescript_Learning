import { Colors, EmbedBuilder, GuildMember} from "discord.js";
export class WelcomeEmbed
{
    public buildWelcomeEmbed(member: GuildMember) : EmbedBuilder
    {
        const embed = new EmbedBuilder();
        try 
        {
            embed.setAuthor({
                iconURL: member.displayAvatarURL(),
                name: member.user.tag + " hat den Server betreten"
            })
            
            .setColor(Colors.Orange)
            .setDescription('🔥 **Willkommen!**\n\nLange bist Du durch die verregneten Straßen der Großstadt gestapft. Eine Tür am Ende einer dunklen Gasse weckt Dein Interesse. Mit müden Augen, drückst Du auf den in der Form eines Phönix gehaltenen Klingelknopf. Die Tür schwingt auf, und ein, in gedämpftes, warmes Licht getauchter Raum liegt vor Dir. Sitz- und Sofagruppen gemütlich vor einem offenen Kamin arrangiert, dessen Flammen sanft das Birkenholz umspielen und es beruhigend knacken lassen. Wände gefüllt mit Bücherregalen und schweren Wandteppichen, auf einer Seite des Raumes in einer Bar abschließend.')
            .setFields([
                {
                    name: ' ',
                    value: `***"Tritt ein, `+member.user.username+`, wir haben Dich bereits erwartet. Wärme Dich auf, genieß' das Ambiente und fühl' Dich wie zu Hause."*** 🔥`,
                    inline: true
                }])
        } 
        catch (error) 
        {
            console.log(error);
        }
            return embed;
    }
}