const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpMessage = new discord.RichEmbed()
        .setColor("#46803f")
        .setTitle(`MoonMC - Help Menu`)
        .addField("Commando's", "/leden\n /ticket\n/info\n/play (link)\n ...")
        .setTimestamp()
        .setFooter();

    message.channel.send(helpMessage);

}
module.exports.help = {
    name: "/help",
    description: "Get the help command",
    usage: "/help"
}