// import discord
const Discord = require("discord.js");

// command format
exports.run = (client, message, args) => {
  let guild = message.guild
  // sneds this message and deletes it right after
  message.channel.send('Pinging...').then(sent => {
    sent.delete();
    // making the ping message
    let ping = [`Im Alive ${sent.createdTimestamp - message.createdTimestamp}ms`, `Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`, `My Ping ${sent.createdTimestamp - message.createdTimestamp}ms \nAPI ${Math.round(client.ws.ping)}ms`]
    // making an embed and using the ping command in it
    let embed = new Discord.MessageEmbed()
      .setTitle("Ping Results")
      .setDescription(ping[Math.floor(Math.random() * ping.length)])
      .setColor("#2F3136")
    // sends message and if it cathes an error it will send the following message
    message.reply({ embeds: [embed] }).catch(err => {
      message.reply('An error has occured')
      console.log(err)
    })
  })
}
