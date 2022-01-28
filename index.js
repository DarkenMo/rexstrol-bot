// importing needed things
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
require('events').EventEmitter.defaultMaxListeners = 0
// intents
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS] });
// importing configs. it contains the token, prefix and ect.
const config = require("./config.json");

// making a name for our config import so its easier to use
client.config = config;

// for commands logging
client.commands = new Enmap();
client.aliases = new Enmap();

// on ready activity status.
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const newLocal = "d.help | built by DarkenMo";
  setInterval(() => {
    const statuses = [
      `d.help | built by DarkenMo.`,
      `Still in development!`,
    ];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status);
  }, 5000);
})

// console logging and checking for errors on every file
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);

    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(client.commands)
  });
});
fs.readdir("./commands/fun", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/fun/${file}`);

    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(client.commands)
  });
});
fs.readdir("./commands/modaration", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/modaration/${file}`);

    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(client.commands)
  });
});

fs.readdir("./commands/utils", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/utils/${file}`);

    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(client.commands)
  });
});

//=====================================================\\

//======================================================\\

// logging in to the bot with the token thats recieved from the config.json file
client.login(config.token);
