const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    function checkBots(guild) {
        let botCount = 0;
        guild.members.forEach(member => {
          if(member.user.bot) botCount++;
        });
        return botCount;
      }

      function checkMembers(guild) {
        let memberCount = 0;
        guild.members.forEach(member => {
          if(!member.user.bot) memberCount++;
        });
        return memberCount;
      }

      let botconfig = JSON.parse(fs.readFileSync("./botconfig.json", "utf8"));
   


var icon = bot.user.displayAvatarURL;

var embed = new discord.RichEmbed()
.setTitle(`MoonMC - MemberCount`)
.setDescription(`Wij hebben momenteel **${message.guild.memberCount}** leden`, "Ook wensen wij jou prettige feestdagen! 🎄")
.setColor("#46803f")

return message.channel.send(embed);
}

    module.exports.help = {
        name: "/leden"
}