import { Collection } from "discord.js";
import { commandModule } from "../models/commandModel";
import { ping } from "./ping";
import { startgame } from "./startgame";

export const commands = new Collection<string, commandModule>()
    .set("ping", ping)
    .set("startgame", startgame)

