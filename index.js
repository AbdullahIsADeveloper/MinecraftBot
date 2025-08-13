const mineflayer = require("mineflayer");
const http = require("http");

let bot;

async function startBot() {
  bot = mineflayer.createBot({
    host: "bemincollege.aternos.me",
    port: 26191,
    username: "Server",
    auth: "offline",
    version: "1.21.4",
  });

  bot.on("spawn", () => {
    const block = bot.findBlock({
      matching: bot.registry.blocksByName.oak_trapdoor.id,
      maxDistance: 32,
    });
    bot.chat("I have spawned in!");
    if (!block) {
      bot.chat("No trapdoor found!");
      return;
    }
    setInterval(() => {
      bot.activateBlock(block);
    }, 100);
  });

  bot.on("error", (err) => console.error("Bot error:", err));
  bot.on("end", () => console.log("Bot disconnected."));
}

startBot();

http
  .createServer((req, res) => {
    console.log("Bot is running");
    res.end();
  })
  .listen(process.env.PORT || 3000);
