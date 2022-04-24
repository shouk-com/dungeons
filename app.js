require('dotenv').config();
const fs = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { Client, Intents, Collection } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

const commands = []
client.commands = new Collection();

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
});



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const CLIENT_ID = client.user.id;

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            if (process.env.ENV === "production") {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID),
                    {
                        body: commands
                    },
                );
                console.log('Successfully reloaded application (/) commands GLOBALY.');
            }
            else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.G_ID),
                    {
                        body: commands
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

    const command = client.commands.get(interaction.commandName)
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