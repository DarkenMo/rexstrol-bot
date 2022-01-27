const Discord = require("discord.js")


exports.run = async (client, message, args, utils) => {
    if (args.length === 0) {
        return await message.reply({ content: "Please Ask me A Question" });
    }
    var answers = [
        'No😩',
        'Yes😉',
        'Maybe😛',
        'Never!!!👹',
        'Yes of course🤗',
        'Nope',
        'Yes but no😔',
        'Probably😉',
        'Of course not, You silly baka🤭',
        'SIMP!',
    ]


    let answer = answers[Math.floor(Math.random() * answers.length)]
    let ball = new Discord.MessageEmbed()
        .setTitle("Results:")
        .setDescription(answer)
        .setColor("#2F3136")
    let guild = message.guild
    message.reply({ embeds: [ball] }).catch(err => {
        message.reply('An error has occured')
        console.log(err)
    })

}

exports.conf = {
    enabled: true,
    name: '8ball',
    description: 'Ask any questions and i will answer them ;)',
};
