import { Event } from "../client/Event";
import { Crunchyroll_API } from "../controllers/crunchyroll_API";
import { StickyMessage } from "../logic/stickyMessage";

export default new Event("messageCreate", async (message) => {

    if(message.member?.id !== '1104701684539740191' && message.channelId === '1075713574527320064')
    {
        //new StickyMessage().Message(message);
    }
});