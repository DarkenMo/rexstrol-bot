// importing discord
const Discord = require("discord.js");

// command format
exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

    // checks if the user has a avatar or not
    if (!member.user.avatarURL) return message.reply(`That user does not have an avatar`);

    // creats an enbed with the users name and avatar
    const avatar = new Discord.MessageEmbed()
        .setTitle(`${member.user.username}'s Avatar`)
        .setColor("#2F3136")
        .setImage(member.user.displayAvatarURL({ dynamic: true }))
        .setURL(member.user.avatarURL())
    message.reply({ embeds: [avatar] })
        // if an error occurs its prob because the bot doesn't have permission to send embeds so make sure to turn that on
        .catch(err => {
            message.reply('An error has occured **missing permissions: Embed links**')
            // logs the error
            console.log(err)
        })

}