// importing buttons and discord
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');


// text format
exports.run = async (client, message, args) => {
  let guild = message.guild
  // sneds this message and deletes it right after
  message.channel.send('Grabbing Commands...').then(sent => {
    sent.delete();
    // creates an embed with this info inside it
    let embed = new Discord.MessageEmbed()
      .setTitle("INFORMATION")
      .setDescription("you can put your commands here")
      .setFooter("More Commands Coming Soon " + `Requested By ${message.author.username}`)
      .setColor("#2F3136")
      .setTimestamp()

    // action button link type
    const inviteb = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setURL('https://discord.com/api/oauth2/authorize?client_id=904507209222881310&permissions=8&scope=bot')
          .setStyle("LINK")
          .setLabel('Invite')
      );
    // if an error occures it will repy this
    message.reply({ embeds: [embed], components: [inviteb] }).catch(err => {
      message.reply('An error has occured')
      console.log(err)
    })

  })
}

// configs for command logging
exports.conf = {
  enabled: true,
  name: 'help',
  description: 'Displays my commands.',
};