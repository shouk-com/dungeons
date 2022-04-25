import { Collection } from "discord.js";
import { commandType } from "../models/types";
import { addcharacter } from "./addcharacter";
import { ping } from "./ping";
import { startgame } from "./startgame";

export const commands = new Collection<string, commandType>()
    .set("ping", ping)
    .set("startgame", startgame)
    .set("addcharacter", addcharacter)

