import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import firebase from "firebase";
import { db } from "../services/firebaseServ";

export type commandType = {
    data: SlashCommandBuilder,
    run(interaction: CommandInteraction<CacheType>): Promise<void>
}

export type gameType = {
    id: string,
    content: string,
}

export type characterType = {
    name: string,
    playerid: string,
    role: string,

}

