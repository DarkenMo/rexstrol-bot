const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if(!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply('You do not have permission.')

    if (!member) return message.reply("Please specify a member!");

    try {
      member.setNickname(null);
      message.reply("Reseted " + `${member}'s` + " nickname.")
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.toString() + " nickname!"
      );
    }
  },
};