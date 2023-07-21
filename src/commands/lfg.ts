import { ApplicationCommandOptionType, ForumChannel, GuildTextThreadManager, MessagePayload, ThreadChannel } from "discord.js";
import { Command } from "../client/Command";

export default new Command(
{
    name: "lfg",
    description: "looking for group",
    options: [
        {
            name: 'url',
            description:'please enter a steam game url',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'message',
            description:'enter a message',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        
    run: async ({ interaction }) => 
    {
        const threadId = '1081483395701411900';
        const channel = await interaction.guild?.channels.fetch(threadId).then(x => {return x as ForumChannel})

        let title = "";
        let message = "";

        for(const option of interaction.options.data)
        {
            if(option.name === 'url')
                title = option.value?.toString() || "";
            else if(option.name === 'message')
                message = option.value?.toString() || "";
        }
            const thread = await channel?.threads.create({
                name: title,
                message: {content: message}
            });

        interaction.followUp({content: 'Thread created!',ephemeral: true});
    }
});