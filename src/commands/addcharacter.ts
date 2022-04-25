import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { commandType } from "../models/types";
import { charDocRef } from "../services/dataServices";


export const addcharacter: commandType = {
    data: new SlashCommandBuilder()
        .setName('addcharacter')
        .addStringOption(option => {
            return option.setName("charactername")
                .setDescription("The name of your character")
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('characterrole')
                .setDescription('The role of your character')
                .setRequired(true)
        })
        .setDescription('Create a new Game'),
    async run(interaction: CommandInteraction<CacheType>) {
        const characterName = interaction.options.getString("charactername");
        const characterRole = interaction.options.getString("characterrole")
        await charDocRef(interaction.guildId, interaction.user.id)
            .set({
                name: characterName,
                playerid: interaction.user.id,
                role: characterRole
            })
        /**
         * TODO add NLP signaling the addition of a character to the story
         */
        interaction.channel.send(`${characterName} a ${characterRole} has joined the story`)
    }
}