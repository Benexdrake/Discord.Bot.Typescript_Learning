import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

export class PurgeLogic
{
    async Purge(interaction:ExtendedInteraction)
    {
        const message = await interaction.followUp('Purge now');
        const channel = interaction.channel;
        let value = interaction.options.data[0].value as string;
        let max = 0;

        // überprüfe ob value ist nummer
        if(!isNaN(Number(value)))
        {
            const n = parseInt(value)
            if(n > 0 && n <= 100)
            {
                max = n;
            }
        }
        else if(value === 'all')
        {
            max = Number.MAX_VALUE
        }
        
        let purge = max;

        if(max > 100)
            purge = 100;

        for (let index = 0; index < max / 100; index++) 
        {
            await channel?.messages.fetch({ limit: purge }).then(async messages => {
                if(messages.size === 0)
                {
                    max = 0;
                    return;
                }
                for(const message of messages)
                {
                    await message[1].delete();
                } 
              });
        }
    }
}