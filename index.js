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
fs.readdir("./commands/nsfw", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/nsfw/${file}`);

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


// logger: logs every action that a user does in a channel named "logs" the rest of the code is in event/message...
client.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/messageUpdate")(oldMessage, newMessage);
});
client.on("messageDelete", async (message) => {
  require("./events/messageDelete")(message);
});
client.on("channelCreate", function (channel) {
  let message = channel.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`New Channel Or Category Created`)
    .setColor("GREEN")
    .setDescription(`A New Channel Has Been Born: ${channel}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("channelDelete", function (channel) {
  let message = channel.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Channel Deleted`)
    .setColor("RED")
    .setDescription(`A Channel Has Been Terminated: ${channel.name}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("channelUpdate", function (channel, oldChannel) {
  let message = channel.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Channel Updated`)
    .setColor("ORANGE")
    .setDescription(`A Channel Has Been Updated: \nOld Name: ${channel} Old Topic: ${channel.topic}\nNew Name: ${oldChannel} New Topic: ${oldChannel.topic}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("emojiCreate", function (emoji) {
  let message = emoji.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Emoji Created`)
    .setColor("GREEN")
    .setDescription(`A New Emoji Has Been Born: \nEmoji: ${emoji}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("emojiUpdate", function (oldEmoji, newEmoji) {
  let message = oldEmoji.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Emoji Updated`)
    .setColor("ORANGE")
    .setDescription(`A Emoji Has Been Tweaked: \nEmoji: ${oldEmoji.name} \nNew Emoji: ${newEmoji.name} ${newEmoji}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("emojiDelete", function (emoji) {
  let message = emoji.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Emoji Deleted`)
    .setColor("RED")
    .setDescription(`A Emoji Has Been Terminated: \nEmoji: ${emoji}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("roleCreate", function (role) {
  let message = role.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`New Role`)
    .setColor("GREEN")
    .setDescription(`A New Role Has Been Birthed: \nRole: ${role}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("roleUpdate", function (oldRole, newRole) {
  let message = oldRole.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Role Updated`)
    .setColor("ORANGE")
    .setDescription(`A Role Has Been Updated: \nOld Role: ${oldRole.name} \nNew Role ${newRole}`).setTimestamp()
  message.send({ embeds: [embed] })
});
client.on("roleDelete", function (role) {
  let message = role.guild.channels.cache.find(
    (ch) => ch.name === "logs"
  );
  let embed = new Discord.MessageEmbed()
    .setTitle(`Role Deleted`)
    .setColor("RED")
    .setDescription(`A Role Has Been Terminated: \nRole: ${role.name}`).setTimestamp()
  message.send({ embeds: [embed] })
});
//=====================================================\\

//======================================================\\

// logging in to the bot with the token thats recieved from the config.json file
client.login(config.token);
