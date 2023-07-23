import { Event } from "../client/Event";
import {client} from '..';


export default new Event("guildMemberAdd", async (newMember) => 
{
    const guild = client.guilds.cache.find(x => x.id === newMember.guild.id)
    
    const role = guild?.roles.cache.find(x => x.name === 'Member');
    
    const member = guild?.members.cache.find(x => x.id === newMember.id);

    if(member !== undefined && role !== undefined)
        await member.roles.add(role);
});