const discord = require("discord.js");
const levelFile = require("../data/levels.json");

module.exports.run = async (bot, message, args) => {

      var idUser = message.author.id;

      if(!levelFile[idUser]){

        levelFile[idUser] = {

         xp: 0,
         level: 0,
        }

 }

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;

    var whenNextLevel = nextLevelXp - xpUser;

    var embedLevel = new discord.RichEmbed()
        .setTitle("MoonMC - Level")
        .setColor("#46803f")
        .addField("level: ", levelUser, true)
        .addField("xp", xpUser, true)
        .setFooter(`${whenNextLevel} xp tot volgende level`, message.author.displayAvatarURL);

        message.channel.send(embedLevel);

}

module.exports.help = {
        name: "/level"
}