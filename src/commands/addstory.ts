import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { commandType } from "../models/types";
import { charDocRef, gameDocRef } from "../services/dataServices";


export const addstory: commandType = {
    data: new SlashCommandBuilder()
        .setName('addstory')
        .addStringOption(option => {
            return option.setName("story")
                .setDescription("The story")
                .setRequired(true)
        })
        .setDescription('Add something to the story'),
    async run(interaction: CommandInteraction<CacheType>) {
        const story = interaction.options.getString("story"); //TODO convert to reasonable text 

        const prevGameStateRef = await gameDocRef(interaction.guildId).get()
        if (!prevGameStateRef.exists) {
            interaction.reply({
                content: "There was an error",
                ephemeral: true
            })
            return;
        }
        const pGameState = prevGameStateRef.data();

        await gameDocRef(interaction.guildId)
            .update({
                content: `${pGameState.content} \n ${story} `
            })


        //WARNING: doesnt update with gpt-2
    }
}