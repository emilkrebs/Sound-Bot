// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const colors = require('colors');
require("dotenv").config();
const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');

const { pauseAnswer, playAnswer, resumeAnswer } = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const player = createAudioPlayer();

const songUrl = process.env.SONG_URL;

const playComamnd = process.env.PLAY_COMMAND;

// I removed pause and resume to make this bot more annoying
const pauseCommand = process.env.PAUSE_COMAMND;
const resumeCommand = process.env.RESUME_COMMAND;

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(getTime() + colors.green('Bot is Ready.'));
	console.log(getTime()+ colors.green(`Bot is logged in as ${colors.yellow(client.user.tag)}.`));
});

function playSound(){
	let resource = createAudioResource(songUrl, {
		inputType: StreamType.Arbitrary
	});
	player.play(resource);
}

client.on('messageCreate', async message => {
	if (!message.guildId) return;
	const { content } = message;
	if (content === playComamnd) {
		const channel = message.member.voice.channel;
		if(!channel) return await message.reply({ content: "You are not in a voice channel.", ephemeral: true });

		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		connection.subscribe(player);
		playSound();
		player.on('idle', () =>{
			playSound();
		})
		player.unpause();
		console.log(getTime() + colors.green('Bot is playes sound.'));
		return await message.reply({ content: playAnswer, ephemeral: false });
	}
});

function getTime() {
    let dateTime = new Date()
    return colors.gray(`[${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}] `);
}
// Login to Discord with your client's token
client.login(process.env.TOKEN);
