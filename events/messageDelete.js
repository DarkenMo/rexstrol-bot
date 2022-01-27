// import discord
const { MessageEmbed } = require("discord.js");
// message delete logging
module.exports = async (message) => {
  try {
    if (message.author.bot) return;
    let embed = new MessageEmbed()
      .setTitle(`New message deleted!`)
      .setDescription(
        `**The user ${message.author.tag} has deleted a message in <#${message.channel.id}>**`
      )
      .addField(`Content`, message.content, true)
      .setColor(`RED`);
    let channel = message.guild.channels.cache.find(
      (ch) => ch.name === "logs"
    );
    if (!channel) return;
    channel.send({ embeds: [embed] });
  } catch (e) { }
};