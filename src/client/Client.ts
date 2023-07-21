import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from "discord.js";
import { Event } from "./Event";
const {token, guildId} = require('../../config.json');

import { CommandType } from "../type/CommandType";

import glob from "glob";
import { promisify } from "util";

import { RegisterCommandsOptions } from "../interfaces/RegisterCommandsOptions";

const globPromise = promisify(glob);

export class ExtendedClient extends Client 
{
    commands: Collection<string, CommandType> = new Collection();

    constructor() 
    {
        super({ intents: 32767 });
    }

    start(dir:string) 
    {
        this.registerModules(dir);
        this.login(token);
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
        //console.log(commandFiles);
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log('Registered: '+command.name);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: guildId
            });
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