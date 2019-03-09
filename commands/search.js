const discord = require("discord.js")
const roblox = require("noblox.js")

module.exports.run = async (bot, message, args) => {
  let username = args[0]
 if (username) {
   roblox.getIdFromUsername(username).then(id => {
     if (id) {
       roblox.getPlayerInfo(parseInt(id)).then(function(info) {
         let date = new Date(info.joinDate)
         let dateInfo = bot.extractDate(date)
         let embed = new discord.RichEmbed()

         .setColor("#7700ff")
         .setURL(`https://roblox.com/users/${id}/profile`)
         .setTimestamp()
         .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
         .addField("Username", info.username || 'Unresolvable', true)
         .addField("User ID", id || 'Unresolvable', true)
         .addField("Description", info.blurb || 'Nothing', true)
         .addField("Status", info.status || 'Nothing', true)
         .addField("Account Age", `${info.age} days old` || 'Unresolvable')
         .addField("Register Date", `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` || 'Unresolvable')
         .addField("User Link", `https://roblox.com/users/${id}/profile`)
         .setFooter(`System Developed by Engine#1636 & astrovibes#8096`, bot.user.avatarURL)
          message.channel.send({embed})
       })
     }

   }).catch(function (err) {
     message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again!" + bot.responseEmojis.hmm)
   });
} else {
   message.channel.send("Please provide a valid username, e.g. '~search ROBLOX'.")
 }
    }

module.exports.help = {
    name: "search"
}
