const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -kick <@user> [reason]

    let botHasNoPermission = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription("Ik heb onvoldoende permissies om het command uit te voeren.")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!message.guild.me.hasPermission("ADMINISTRATOR"))

        return message.channel.send(botHasNoPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    var staffRole = global.staffRole;

    let noPermission = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription(`Je hebt de benodigde **${staffRole}** role nodig om het command uit te voeren.`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!message.member.roles.find(r => r.name === staffRole))

        return message.channel.send(noPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let noArgs = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription("Gebruik *-kick <@user> [reden]*")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!args[0])

        return message.channel.send(noArgs).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let logChannel = message.guild.channels.find(c => c.name === "logs");

    let noLogChannel = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription("Het log-kanaal is niet gevonden..")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!logChannel)

        return message.channel.send(noLogChannel).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Geen reden.";

    let noKickedUser = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription(`De gebruiker **${args[0]}** is niet gevonden..`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!kickedUser)

        return message.channel.send(noKickedUser).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );
        
    let cantKickModerator = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription(`Je kunt deze gebruiker niet kicken, omdat hij/zij een stafflid is.`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (kickedUser.roles.find(r => r.name === staffRole))

        return message.channel.send(cantKickModerator).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    var kickLog = new discord.RichEmbed()
        .setColor("#ffbc36")
        .setAuthor(`🔨 ${message.guild} - Kicklog`)
        .setDescription("Een kick-log van iemand die de regels heeft overtreden.")
        .addField("Gekickte gebruiker", kickedUser.user.tag, true)
        .addField("Gekickt door", message.author.tag, true)
        .addField("Reden", reason, true)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    logChannel.send(kickLog);

    var kickedUserSendMessage = new discord.RichEmbed()
        .setDescription(`Beste gebruiker,\n\nJe bent gekickt uit **${message.guild.name}**\n\n**Executor »** ${message.author.tag}\n**Reden »** ${reason}.`)
        .setColor("#ffae52")
        .setTimestamp()
        .setFooter("CloudMC™");

    await kickedUser.send(kickedUserSendMessage);

    message.delete()

    let kickSuccess = new discord.RichEmbed()
        .setColor("#75db60")
        .setDescription(`De gebruiker **${kickedUser.user.tag}** is succesvol gekickt.`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    let awaitKick = new discord.RichEmbed()
        .setColor("#cf3232")
        .setDescription(`**${kickedUser.user.tag}** aan het kicken...`)
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    message.channel.send(awaitKick).then((awaitingKick) => {

        message.guild.member(kickedUser).kick(reason);

        setTimeout(function(){

            awaitingKick.edit(kickSuccess).then(

                msg => msg.delete(5000)
    
            );

        }, 2000);

    });

};

module.exports.help = {
    name: "-kick",
    description: "Kick an user from the discord.",
    usage: "-kick <@user> [reason]"
}