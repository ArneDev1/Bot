const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (args[0] == null) {

        var HelpNull = new discord.RichEmbed()
        .setColor("#088A4B")
        .setTitle("Status | CloudMC")
        .setDescription("Lobby: Online \nMinetopia: Online \nKingdom: Online\n\n[🔨]  Status: *Onderhoud!*\n\n [📍] play.cloud-mc.nl.")
        .setTimestamp("");


        message.channel.send(HelpNull);

    };
}
    module.exports.help = {
        name: "-serverstatus"
}