const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -ban <@user> [reason]

    let botHasNoPermission = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription("Ik heb onvoldoende permissies om het command uit te voeren.")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!message.guild.me.hasPermission("ADMINISTRATOR"))

        return message.channel.send(botHasNoPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    var staffRole = global.staffRole;

    let noPermission = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`Je hebt de benodigde **${staffRole}** role nodig om het command uit te voeren.`)
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!message.member.roles.find(r => r.name === staffRole))

        return message.channel.send(noPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let noArgs = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription("Gebruik */ban <@user> [reden]*")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!args[0])

        return message.channel.send(noArgs).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let logChannel = message.guild.channels.find(c => c.name === "staff-logs");

    let noLogChannel = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription("Het log-kanaal is niet gevonden..")
        .setTimestamp()
        .setFooter("CloudMC™ © Development Team");

    if (!logChannel)

        return message.channel.send(noLogChannel).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Geen reden.";

    let noBannedUser = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`De gebruiker **${args[0]}** is niet gevonden..`)
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!bannedUser)

        return message.channel.send(noBannedUser).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let cantBanModerator = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`Je kunt deze gebruiker niet bannen, omdat hij/zij een stafflid is.`)
        .setTimestamp()
        .setFooter("CloudMC ");

    if (bannedUser.roles.find(r => r.name === staffRole))

        return message.channel.send(cantBanModerator).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    var banLog = new discord.RichEmbed()
        .setColor("#74DF00")
        .setAuthor(`🔨 ${message.guild} - Banlog`)
        .setDescription("Een ban-log van iemand die de regels heeft overtreden.")
        .addField("Verbannen gebruiker", bannedUser.user.tag, true)
        .addField("Verbannen door", message.author.tag, true)
        .addField("Reden", reason, true)
        .setTimestamp()
        .setFooter("CloudMC ");

    logChannel.send(banLog);

    var bannedUserSendMessage = new discord.RichEmbed()
        .setDescription(`Beste gebruiker,\n\nJe bent verbannen uit **${message.guild.name}**\n\n**Executor »** ${message.author.tag}\n**Reden »** ${reason}.`)
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC™");

    await bannedUser.send(bannedUserSendMessage);

    message.delete()

    let banSuccess = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`De gebruiker **${bannedUser.user.tag}** is succesvol verbannen.`)
        .setTimestamp()
        .setFooter("CloudMC ");

    let awaitBan = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`**${bannedUser.user.tag}** aan het bannen...`)
        .setTimestamp()
        .setFooter("CloudMC ");

    message.channel.send(awaitBan).then((awaitingBan) => {

        message.guild.member(bannedUser).ban(reason);

        setTimeout(function(){

            awaitingBan.edit(banSuccess).then(

                msg => msg.delete(5000)
    
            );

        }, 2000);

    });

};

module.exports.help = {
    name: "/ban",
    description: "Ban an user from the discord.",
    usage: "/ban <@user> [reason]"
}