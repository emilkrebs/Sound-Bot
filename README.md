# Sound Discord Bot
Play a sound in a discord channel indefinitely.

# Getting started
- Clone the repository using `git clone https://github.com/emilkrebs/sound-bot.git`
- create a `config.json` file which looks like this
```json
{
	"clientId": "123456789012345678",
	"guildId": "123456789012345678",
	"token": "your-token-goes-here",
	"pauseCommand": "pause",
	"resumeCommand": "resume",
	"playCommand": "superidol",
	"playAnswer":"SuperIdol will now song for you.",
	"pauseAnswer":"SuperIdol will now pause singing.",
	"resumeAnswer":"SuperIdol will now resume singing."
}

```
- `npm i` to install all required dependencies
- `npm run start` to start the bot
