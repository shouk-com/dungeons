import { Collection } from "discord.js";
import { commandType } from "../models/types";
import { addcharacter } from "./addcharacter";
import { addstory } from "./addStory";
import { dochar } from "./dochar";
import { ping } from "./ping";
import { saychar } from "./saychar";
import { startgame } from "./startgame";

export const commands = new Collection<string, commandType>()
    .set("ping", ping)
    .set("startgame", startgame)
    .set("addcharacter", addcharacter)
    .set("do", dochar)
    .set("say", saychar)
    .set("addstory", addstory)

