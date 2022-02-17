// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const colors = require('colors');
const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');

const { token, playCommand, pauseCommand, resumeCommand, pauseAnswer, playAnswer, resumeAnswer } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const player = createAudioPlayer();


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(getTime() + colors.green('Bot is Ready.'));
	console.log(getTime()+ colors.green(`Bot is logged in as ${colors.yellow(client.user.tag)}.`));
});

function playSound(){
	let resource = createAudioResource("https://www.myinstants.com/media/sounds/super-idol.mp3", {
		inputType: StreamType.Arbitrary
	});
	player.play(resource);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.guildId) return;
	const { commandName } = interaction;
	
	if (commandName === playCommand) {
		const channel = interaction.member.voice.channel;
		if(!channel) return await interaction.reply({ content: "You are not in a voice channel.", ephemeral: true });
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		connection.subscribe(player);
		playSound();
		player.on('idle', () =>{
			playSound();
		})
		player.unpause();
		console.log(getTime() + colors.green('Bot is playes sound.'));
		return await interaction.reply({ content: playAnswer, ephemeral: false });
	}
	else if (interaction.commandName === pauseCommand) {
		player.pause();
		console.log(getTime() + colors.green('Bot is paused sound.'));
		return await interaction.reply({ content: pauseAnswer, ephemeral: false });
	}
	else if (interaction.commandName === resumeCommand) {
		player.pause();
		console.log(getTime() + colors.green('Bot is unpaused sound.'));
		return await interaction.reply({ content: resumeAnswer, ephemeral: false });
	}

});

function getTime() {
    let dateTime = new Date()
    return colors.gray(`[${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}] `);
}
// Login to Discord with your client's token
client.login(token);
