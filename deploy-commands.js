const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, playCommand, pauseCommand, resumeCommand } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName(playCommand).setDescription('Play to song in your current voice channel'),
	new SlashCommandBuilder().setName(pauseCommand).setDescription("Pause the song"),
	new SlashCommandBuilder().setName(resumeCommand).setDescription("Resume the song"),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);