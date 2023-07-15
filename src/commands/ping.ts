import { Command } from "../client/Command";

export default new Command({
    name: "ping",
    description: "replies with pong",
    run: async ({ interaction }) => {
        interaction.followUp("Ping Pong");
        console.log("Ping Pong");
    }
});