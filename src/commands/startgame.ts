import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { commandModule } from "../models/commandModel";


export const startgame: commandModule = {
    data: new SlashCommandBuilder()
        .setName('startgame')
        .addStringOption(option => {
            return option.setName("newstory")
                .setDescription("Add the Initial story")
                .setRequired(true)
        })

        .setDescription('Create a new Game'),
    async run(interaction: CommandInteraction<CacheType>) {
        const initStory = interaction.options.getString("newstory");
        interaction.reply(initStory);
    }
}