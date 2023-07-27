import { Event } from "../client/Event";
import { Crunchyroll_API } from "../controllers/crunchyroll_API";
import { StickyMessage } from "../logic/stickyMessage";

const {discord}  = require('../../config.json');

export default new Event("messageCreate", async (message) => {

    if(message.member?.id !== '1104701684539740191')
    {
        await new StickyMessage().CheckMessage(message);
    }
});