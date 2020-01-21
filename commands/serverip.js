const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpMessage = new discord.RichEmbed()
        .setColor("#74DF00")
        .addField(`play.moonmc.net`, "De server is momenteel nog niet open dus je kan nog niet joinen.")

    message.channel.send(helpMessage);

}
module.exports.help = {
    name: "/ip",
    description: "Get the help command",
    usage: "/ip"
}