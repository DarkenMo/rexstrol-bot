exports.run = async (client, message, args, level) => {
  let texto = args.join("+")
  let guild = message.guild
  const response = Math.floor(Math.random(1 - 39) * 39);
  if (args.length === 0) {
    return await message.reply({ content: "Please provide a sentence." });
  }
  else {
    message.reply(`https://www.minecraftskinstealer.com/achievement/a.php?i=${response}&h=Achievement+Unlocked%21&t=${texto}`).catch(err => {
      message.reply('An error has occured')
      console.log(err)
  })
  }
};
