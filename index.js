const mineflayer = require('mineflayer');
const http = require('http');

const bot = mineflayer.createBot({
  host: 'bemincollege.aternos.me',
  port: 26191,
  username: 'Server',
  auth: 'offline',
  version: '1.21.4'
});

bot.on('spawn', () => {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 100);
  }, 200);
});

http.createServer((req, res) => {
  console.log(req);
}).listen(process.env.PORT || 3000);