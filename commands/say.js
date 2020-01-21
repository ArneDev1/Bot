const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -say <message>

    let say = args.join(" ");

    let noArgs = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription("Gebruik *-say <message>*")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!say) {

        return message.channel.send(noArgs).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    } else {

        message.channel.send(say)

        message.delete()

    };

};
module.exports.help = {
    name: "-say",
    description: "Let the bot say a message",
    usage: "-say <message>"
}