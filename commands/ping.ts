import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { commandModule } from "../models/commandModel";

export const ping: commandModule = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription('pong'),
    async run(interaction: CommandInteraction<CacheType>) {
        interaction.reply('pong')
    }
}