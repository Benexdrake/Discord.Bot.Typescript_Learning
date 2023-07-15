import {ExtendedClient} from "./client/Client"

export class Start
{
    public client = new ExtendedClient();
    
    StartDiscord()
    {
        this.client.start(__dirname);
    }
}