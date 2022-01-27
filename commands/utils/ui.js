// import discord
const Discord = require('discord.js');

// our message format
exports.run = async (client, message, args, bot, guild) => {
  const moment = require('moment');

  // if the user doesnt exists
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!user || user == null || user.id == null || !user.id) return message.reply({ content: "❌ Cannot Find The User You Are Trying To Find Out About" })

  // getting the user id
  const member = message.guild.members.cache.get(user.id);
  // checking roles
  const roles = member.roles;
  // checking flags/badges
  const userFlags = member.user.flags.toArray();
  //
  const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    PARTNERED_SERVER_OWNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    EARLY_VERIFIED_BOT_DEVELOPER: 'Verified Bot Developer',
    DISCORD_CERTIFIED_MODERATOR: 'Certified Discord Moderator'
  };
  function trimArray(arr, maxLen = 25) {
    if (arr.array().length > maxLen) {
      const len = arr.array().length - maxLen;
      arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
      arr.map(role => `<@&${role.id}>`)
      arr.push(`${len} more...`);
    }
    return arr.join(", ");
  }

  // checking status
  const status = {
    "online": "🟢 **ONLINE**",
    "idle": "🟠 **IDLE**",
    "dnd": "🔴 **DND**",
    "offline": "⚫ **OFFLINE**",
  }

  // checks if the use is online or offline because when the user gets put into the list for the first time it comes out as null and discord cant read null
  const activities = [];
  let customStatus;
  if (member.presence == null) {
    message.reply({ content: "You or the user your trying to use the command on must be online." })
    return;

  }
  // activity
  else {
    for (const activity of member.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }
    }
  }
  // making the user info embed
  let embeduserinfo = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor("#2F3136")
    .setAuthor("Information about: " + member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .addField("**❱ Nickname:**", `${member.nickname !== null ? `✔️ **Nickname:** ${member.nickname}` : "❌ **None**"}`, true)
    .addField('**❱ Username:**', `<@${member.user.id}>\n\`${member.user.tag}\``, true)
    .addField('**❱ ID:**', `\`${member.id}\``, true)
    .addField('**❱ Status:**', `${status[member.presence.status]}`, true)
    .addField('**❱ Avatar:**', `[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`, true)
    .addField('**❱ Date Joined Discord:**', "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`", true)
    .addField('**❱ Date Join Guild:**', "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", true)
    .addField('**❱ Boosting Server:**', member.premiumSince ? '✔️' : '❌', true)
    .addField('**❱ Flags:**', `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
    .addField(`**❱ Roles:** `, `<@&${member._roles.join('>, <@&')}>` || '❌ **`None`**')
    .addField('**❱ Highest Role:**', `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`, true)
    .addField('**❱ Is a Bot:**', `\`${member.user.bot ? "✔️" : "❌"}\``, true)
    .addField('**❱ Permissions:**', `${message.member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)

  if (activities.length > 0) embeduserinfo.setDescription(activities.join('🎮\n'));
  if (customStatus) embeduserinfo.spliceFields(0, 0, { name: 'Custom Status 🎮', value: customStatus });

  // sending the embed
  message.reply({ embeds: [embeduserinfo] })
}