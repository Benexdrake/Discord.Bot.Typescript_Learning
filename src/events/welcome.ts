import { Event } from "../client/Event";
import { WelcomeLogic } from "../logic/welcomeLogic";

export default new Event("guildMemberAdd", (member) => 
{
    new WelcomeLogic().Welcome(member);
});