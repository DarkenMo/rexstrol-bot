const translate = require('translate-google')
const Discord = require('discord.js')

module.exports= {
    name : 'translate',
    run : async(client, message, args) => {
        translate(args.join(" "), {to : 'en'}).then(res => {
            let translation = new Discord.MessageEmbed()
            .setTitle("Results:")
            .setDescription(res)
            .setFooter(`Requested By ${message.author.username}`)
            .setColor("#2F3136")
            message.reply({ embeds: [translation]})
        }).catch(err => {
            message.reply('An error has occured')
            console.log(err)
        })
    }
}