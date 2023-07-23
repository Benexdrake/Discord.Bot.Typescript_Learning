import { Event } from "../client/Event";
import { WelcomeLogic } from "../logic/welcomeLogic";

export default new Event("guildMemberUpdate", (oldMember,newMember) => 
{
    new WelcomeLogic().Welcome(newMember);
});