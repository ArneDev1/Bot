const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpMessage = new discord.RichEmbed()
        .setColor("#46803f")
        .addField(`Sollicitatie formulier`, "`vacatures.moonmc.net`")

    message.channel.send(helpMessage);

}
module.exports.help = {
    name: "/solliciteer",
    description: "Get the help command",
    usage: "/solliciteer"
}