import { Event } from "../client/Event";
import { LfgLogic } from "../logic/lfgLogic";


export default new Event('threadCreate', async (thread) => 
{
    await new LfgLogic().LfgThreadCreated(thread);
});