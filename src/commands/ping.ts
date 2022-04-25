import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { commandType } from "../models/types";

export const ping: commandType = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription('pong'),
    async run(interaction: CommandInteraction<CacheType>) {
        interaction.reply('pong')
    }
}