import { Event } from "../client/Event";

export default new Event("messageCreate", (message) => {
    console.log(message.content);
});
