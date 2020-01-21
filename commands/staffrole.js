const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -staffrole <new role>

    let noPermission = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription(`Je hebt onvoldoende permissies om dit command uit te voeren.`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!message.member.hasPermission("ADMINISTRATOR"))
    
    return message.channel.send(noPermission).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    const staffRoleArgs = args.join(" ");

    global.staffRole = staffRoleArgs;

    let noArgs = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription("Gebruik *-staffrole <new staffrole>*")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!args[0])

        return message.channel.send(noArgs).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let staffRoleSuccess = new discord.RichEmbed()
        .setColor("#75db60")
        .setDescription(`De staffrole is succesvol gewijzigd naar **${staffRoleArgs}**`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    message.channel.send(staffRoleSuccess).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

}
module.exports.help = {
    name: "-staffrole",
    description: "Change the staffrole",
    usage: "-staffrole <new staffrole>"
}