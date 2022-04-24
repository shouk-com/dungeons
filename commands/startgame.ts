import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { commandModule } from "../models/commandModel";


export const startgame: commandModule = {
    data: new SlashCommandBuilder()
        .addStringOption(option => {
            return option.setName("Initial Story")
                .setDescription("Add the Initial story")
                .setRequired(true)
        })
        .setName('startgame')
        .setDescription('Create a new Game'),
    async run(interaction: CommandInteraction<CacheType>) {
        const initStory = interaction.options.getString("Initial Story");
        interaction.reply(initStory);
    }
}