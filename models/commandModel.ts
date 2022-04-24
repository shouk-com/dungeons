import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

export type commandModule = {
    data: SlashCommandBuilder,
    run(interaction: CommandInteraction<CacheType>): Promise<void>
}