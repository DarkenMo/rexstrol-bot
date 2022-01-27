// import discord
const Discord = require("discord.js");


// when the bot is turned on:
module.exports = (client) => {
    // lists all the servers the bot is in
    console.log(client.guilds.cache.mapValues(guild => guild.name));
    // lists how many servers, channels and users the bot is in
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
};