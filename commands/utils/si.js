// importing moment.js and discord and config.json
const Discord = require("discord.js");
const config = require('../../config.json');
const moment = require("moment");

// command format
exports.run = async (client, message, args,) => {

    // setting some info
    let boosts = message.guild.premiumSubscriptionCount;
    let boostlevel = 0;
    if (boosts >= 2) boostlevel = "1";
    if (boosts >= 15) boostlevel = "2";
    if (boosts >= 30) boostlevel = "3 / ∞";

    let maxbitrate = 96000;
    if (boosts >= 2) maxbitrate = 128000;
    if (boosts >= 15) maxbitrate = 256000;
    if (boosts >= 30) maxbitrate = 384000;

    // creating an embed for the server info command
    let srv = new Discord.MessageEmbed()
        .setAuthor("Server Information About: " + message.guild.name, message.guild.iconURL({ dynamic: true, }))

        .setColor("#2F3136")

        .addField("**❱ Guild Owner**", `<@${(await message.guild.fetchOwner()).id}>\n\`${message.guild.name}\``, true)

        .addField("**❱ Server Created On** ", "`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "`\n **At:** " + "`" + moment(message.guild.createdTimestamp).format("hh:mm:ss") + "`", true)

        .addField("**❱ You Joined On The:** ", "`" + moment(message.member.joinedTimestamp).format("DD/MM/YYYY") + "`\n **At:** " + "`" + moment(message.member.joinedTimestamp).format("hh:mm:ss") + "`", true)

        .addField("**❱ All Channels (Includes Categorys)**", "👁‍🗨 `" + message.guild.channels.cache.size + "`", true)

        .addField("**❱ Text Channels**", "💬 `" + message.guild.channels.cache.filter((channel) => channel.type == "GUILD_TEXT").size + "`", true)

        .addField("**❱ Voice Channels**", "🔈 `" + message.guild.channels.cache.filter((channel) => channel.type == "GUILD_VOICE").size + "`", true)

        .addField("**❱ Overal User Count**", "😀 `" + message.guild.memberCount + "`", true)

        .addField("**❱ Total Human Users**", "👤 `" + message.guild.members.cache.filter((member) => !member.user.bot).size + "`", true)

        .addField("**❱ Total Bot Users**", "🤖 `" + message.guild.members.cache.filter((member) => member.user.bot).size + "`", true)

        .addField("**❱ Total Boosts**", "`" + message.guild.premiumSubscriptionCount + "`", true)

        .addField("**❱ Boost-Level**", "`" + boostlevel + "`", true)

        .addField("**❱ Max-Talk-Bitrate**", "👾 `" + maxbitrate + " kbps`", true)

        .addField("**❱ Total Emojis:**", `${message.guild.emojis.cache.size} ` + '**Emojis**', true)

        .addField("**❱ Total Roles:**", `${message.guild.roles.cache.size} ` + '**Roles**', true)

        .addField("**❱ Verification Level**", message.guild.verificationLevel, true)

        .setThumbnail(message.guild.iconURL({ dynamic: true, }))

        .setFooter("ID: " + message.guild.id, message.guild.iconURL({ dynamic: true, }))
    // sends message and if it cathes an error it will send the following message
    message.reply({ embeds: [srv] }).catch(err => {
        message.reply('An error has occured')
        console.log(err)
    })
}