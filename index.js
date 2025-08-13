const mineflayer = require('mineflayer');
const http = require('http');

let bot;

async function startBot() {
  bot = mineflayer.createBot({
    host: 'bemincollege.aternos.me',
    port: 26191,
    username: 'Server',
    auth: 'offline',
    version: '1.21.4'
  });

  const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'localhost', // Replace with your server IP or hostname
  port: 25565,       // Replace with your server port
  username: 'TrapdoorBot'
});

bot.on('spawn', () => {
  console.log('Bot spawned!');

  // Find a trapdoor block in the bot's vicinity
  const trapdoorBlock = bot.findBlock({
    matching: bot.registry.blocksByName.oak_trapdoor.id, // Or any other trapdoor type
    maxDistance: 32 // Search within 32 blocks
  });

  if (trapdoorBlock) {
    console.log('Found a trapdoor at:', trapdoorBlock.position);

    // Function to toggle the trapdoor
    const toggleTrapdoor = async () => {
      try {
        await bot.activateBlock(trapdoorBlock);
        console.log('Trapdoor toggled!');
        setTimeout(toggleTrapdoor, 100); // Toggle every 100 milliseconds
      } catch (err) {
        console.error('Error toggling trapdoor:', err.message);
      }
    };

    toggleTrapdoor(); // Start spamming
  } else {
    console.log('No trapdoor found!');
  }
});

bot.on('error', err => console.error('Bot error:', err));
bot.on('end', () => console.log('Bot disconnected.'));
}

startBot();

http.createServer((req, res) => {
  console.log("Bot is running");
  res.end();
}).listen(process.env.PORT || 3000);