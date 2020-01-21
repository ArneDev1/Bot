const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var staffRole = global.staffRole;

    let noPermission = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription(`Je hebt de benodigde **${staffRole}** nodig om het command uit te voeren.`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!message.member.roles.find(r => r.name === staffRole))

        return message.channel.send(noPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let embedArgs = args.slice(1).join(" ");

    let colorCode = args[0];

    let noArgs = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription("Gebruik *-embed <color-code> <message>*")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!args[0] || !args[1])

        return message.channel.send(noArgs).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let embedMessage = new discord.RichEmbed()
        .setColor(colorCode)
        .setDescription(embedArgs)
        .setTimestamp()
        .setFooter(`Embed created by ${message.author.tag}`);

    message.channel.send(embedMessage).then(

        message.delete()

    );

}
module.exports.help = {
    name: "-embed",
    description: "Create a custom embed",
    usage: "-embed <color> <message>"
}