const mineflayer = require('mineflayer');
const http = require('http');

let bot;

function startBot() {
  bot = mineflayer.createBot({
    host: 'bemincollege.aternos.me',
    port: 26191,
    username: 'Server',
    auth: 'offline',
    version: '1.21.4'
  });

  bot.on('spawn', async () => {
    // Find a nearby door block (wooden or iron door)
    const doorBlock = bot.findBlock({
      matching: (block) => block && (block.name === 'wooden_door' || block.name === 'iron_door'),
      maxDistance: 32
    });
    if (doorBlock) {
      console.log('Door found:', doorBlock.name, 'at', doorBlock.position);
      setInterval(async () => {
        try {
          await bot.activateBlock(doorBlock);
        } catch (err) {
          // You may want to log errors for debugging
        }
      }, 500);
    } else {
      console.log('No door found nearby.');
    }
  });

  bot.on('end', () => {
    setTimeout(() => {
      startBot();
    }, 1000);
  });
}

startBot();

http.createServer((req, res) => {
  if (!bot.player) {
    startBot();
  }
  console.log("Bot is running");
  res.end();
}).listen(process.env.PORT || 3000);