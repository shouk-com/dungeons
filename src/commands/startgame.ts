import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { commandType } from "../models/types";
import { charColRef, gameDocRef } from "../services/dataServices";
import { db } from "../services/firebaseServ";


export const startgame: commandType = {
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

        await gameDocRef(interaction.guildId)
            .set({
                id: interaction.guildId,
                content: initStory,
            })

        await charColRef(interaction.guildId)
            .get()
            .then((docs) => {
                docs.forEach(doc => {
                    doc.ref.delete()
                })
            })


        interaction.channel.send("**A New Story Begins!**")
        interaction.channel.send(initStory)
    }
}