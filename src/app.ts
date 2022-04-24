import "dotenv/config"

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { Client, Intents } from 'discord.js';
import { commands } from './commands/controller';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';



const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const allcommands: RESTPostAPIApplicationCommandsJSONBody[] = [];

commands.forEach(command => {
    allcommands.push(command.data.toJSON())
})


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const CLIENT_ID = client.user.id;

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            if (process.env.ENV === "production") {
                // await rest.put(
                //     Routes.applicationCommands(CLIENT_ID),
                //     {
                //         body: allcommands
                //     },
                // );
                console.log('Successfully reloaded application (/) commands GLOBALY.');
            }
            else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.G_ID),
                    {
                        body: allcommands
                    },
                );

                console.log('Successfully reloaded application (/) commands.');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName)
    if (!command) return;

    try {
        await command.run(interaction)
    } catch (error) {
        if (error) console.log(error);

        interaction.reply({
            content: "An error occured",
            ephemeral: true
        })
    }
});

client.login(process.env.TOKEN);