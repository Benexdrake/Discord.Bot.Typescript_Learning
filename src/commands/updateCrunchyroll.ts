import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../client/Command";
import { AnimeUpdateLogic } from "../logic/animeUpdateLogic";



export default new Command(
{
    name: "updatecrunchyroll",
    description: "updatecrunchyroll",
    options: [{name: 'file', description: 'put here the html from crunchyroll in', type: ApplicationCommandOptionType.Attachment, required:true}],
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
        
    run: async ({ interaction }) => 
    {
        await new AnimeUpdateLogic().Update(interaction);
    }
});