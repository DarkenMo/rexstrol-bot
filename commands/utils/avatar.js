const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

    if (!member.user.avatarURL) return message.reply(`That user does not have an avatar`);

    const avatar = new Discord.MessageEmbed()
        .setTitle(`${member.user.username}'s Avatar`)
        .setColor("#2F3136")
        .setImage(member.user.displayAvatarURL({ dynamic: true }))
        .setURL(member.user.avatarURL())
    message.reply({ embeds: [avatar] })
        .catch(err => {
            message.reply('An error has occured **missing permissions: Embed links**')
            console.log(err)
        })

}