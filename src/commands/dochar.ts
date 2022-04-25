import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { commandType } from "../models/types";
import { charDocRef, gameDocRef } from "../services/dataServices";


export const dochar: commandType = {
    data: new SlashCommandBuilder()
        .setName('do')
        .addStringOption(option => {
            return option.setName("action")
                .setDescription("What do you do")
                .setRequired(true)
        })
        .setDescription('Do something in the story'),
    async run(interaction: CommandInteraction<CacheType>) {
        const action = interaction.options.getString("action"); //TODO convert to reasonable text 
        const charSnap = await charDocRef(interaction.guildId, interaction.user.id).get()
        if (!charSnap.exists) {
            interaction.reply({
                content: "INVALID! Create a new character with /addcharacter",
                ephemeral: true
            })
            return;
        }
        const character = charSnap.data()
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
                content: `${pGameState.content} \n ${character} does ${action}`
            })


        //WARNING: doesnt update with gpt-2
    }
}