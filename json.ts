import * as fs from "fs";

export class JsonConvert
{
    // Load Json

    SaveConfig(config:any)
    {
        const json = JSON.stringify(config);
        fs.writeFile('config.json',json, (error) =>
        {
            if(error)
                console.error(error);
        });
    }

    CreateConfig(token:string, guildId:string,stickymessageid:string, stickymessagechannel:string)
    {
        this.SaveConfig({token: token, guildId:guildId, stickymessageid:stickymessageid, stickymessagechannel:stickymessagechannel});
    }
}