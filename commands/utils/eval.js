// importing discord and the file owner.json that has the owner discord id and config.json file
const Discord = require("discord.js");
const permitted = require('../../owners.json');
const config = require('../../config.json');


// our message format
exports.run = (client, message) => {
  // if the author is a bot ignore the message
  if (message.author.bot) return;
  let F = new Discord.MessageEmbed().setColor(config.c).setDescription(`${message.author.username} You Are Not Permitted To Run This Command, This Command Is For The Bot Developers And Owner For Debug Use Of Broken Code!`)
  //  if the author's id does not match the owners id: send embed created earlier
  if (!permitted.includes(message.author.id)) return message.channel.send({ embeds: [F] });

  // eval configs
  const args = message.content.trim().split(' ');
  try {
    var result = args.join(" ").slice(5);
    let noResultArg = new Discord.MessageEmbed()
      .setColor(config.c)
      .setDescription("ERROR: No valid eval args were provided")
    if (!result) return message.channel.send({ embeds: [noResultArg] })
    //
    let evaled = eval(result);

    //
    let resultSuccess = new Discord.MessageEmbed()
      .setColor(config.c)
      .setTitle("Success")
      .addField(`Input:\n`, '```js\n' + `${args.join(" ").slice(5)}` + '```', false)
      .addField(`Output:\n`, '```js\n' + evaled + '```', true)
    message.channel.send({ embeds: [resultSuccess] })
    // if there is an error it will show it in an embed
  } catch (error) {
    let resultError = new Discord.MessageEmbed()
      .setColor(config.c)
      .setTitle("An error has occured")
      .addField(`Input:\n`, '```js\n' + `${result}` + '```', false)
      .addField(`Output:\n`, '```js\n' + `${error.message}` + '```', true)
    return message.channel.send({ embeds: [resultError] })
  }
}