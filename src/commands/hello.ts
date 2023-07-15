import { Command } from "../client/Command";

export default new Command({
    name: "hello",
    description: "hello my friend",
    run: async ({ interaction }) => {
        let int = interaction.followUp(`Hello ${interaction.user.username}`);
    }
});