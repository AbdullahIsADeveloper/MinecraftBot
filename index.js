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

  bot.on('spawn', () => {
    setInterval(() => {
      bot.activateItem();
    }, 200);
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