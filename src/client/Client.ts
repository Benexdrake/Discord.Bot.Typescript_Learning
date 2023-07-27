import {
    ActivityType,
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from "discord.js";
import { Event } from "./Event";
const {discord} = require('../../config.json');

import { CommandType } from "../type/CommandType";

import glob from "glob";
import { promisify } from "util";

import { RegisterCommandsOptions } from "../interfaces/RegisterCommandsOptions";

import { Database } from 'sqlite3';


const globPromise = promisify(glob);

export class ExtendedClient extends Client 
{
    commands: Collection<string, CommandType> = new Collection();
    public db:Database | undefined;

    constructor() 
    {
        super({ intents: 32767 });
        this.db = new Database('db.sqlite');
        this.db.get(
            'create table if not exists sticky ( channelid varchar(128) primary key, messageid varchar(128))'
);
    }

    start(dir:string) 
    {
        this.registerModules(dir);
        this.login(discord.token);
    }

    async importFile(filePath: string) 
    {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) 
    {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules(dir:string) 
    {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${dir}/commands/*.ts`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log('Registered: '+command.name);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.user?.setActivity({name: 'den Usern auf die Finger', type: ActivityType.Watching, url: 'https://github.com/Benexdrake/DiscordTS'})

            for(const guild of this.guilds.cache)
            {   
                this.registerCommands({
                    commands: slashCommands,
                    guildId: guild[1].id
                });
            }
        });

        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );

        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });
    }



}