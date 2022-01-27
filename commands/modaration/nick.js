const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if(!message.guild.me.permissions.has("MANAGE_NICKNAMES")) return message.reply({content:`I do not have the Correct permissions to adjust nicknames ${message.author.username}`})

    if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply('You do not have permission.')


    if (!member) return message.reply("Please specify a member!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Please specify a nickname!");

    member.setNickname(arguments).catch((err) => {
      console.log("got an error at nick.js")
      message.reply(
        member.toString() + "'s permissions are higher than mine."
      );
      return
    });
    message.reply("Changed " + `${member}'s` + " nickname to " + `\`${arguments}\``)

  },
};