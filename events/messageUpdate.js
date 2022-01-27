// import discord
const { MessageEmbed } = require("discord.js");

// message edit logging
module.exports = async (oldMessage, newMessage) => {
  try {
    let embed = new MessageEmbed()
      .setTitle(`New message edited`)
      .setColor(`GREEN`)
      .setDescription(
        `**The user ${oldMessage.author.tag} has edited a message in <#${oldMessage.channel.id}>**`
      )
      .addField(`Old Content`, oldMessage.content, true)
      .addField(`New Content`, newMessage.content, true);
    let channel = oldMessage.guild.channels.cache.find(
      (ch) => ch.name === "logs"
    );
    if (!channel) return;
    channel.send({ embeds: [embed] });
  } catch (e) { }
};