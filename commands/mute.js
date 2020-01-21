const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -mute <@user> [reason]

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
        .setDescription(`Je hebt de benodigde **${staffRole}** nodig om het command uit te voeren.`)
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
        .setDescription("Gebruik */mute <@user> [reden]*")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!args[0])

        return message.channel.send(noArgs).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let logChannel = message.guild.channels.find(c => c.name === "logs");

    let noLogChannel = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription("Het log-kanaal is niet gevonden..")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!logChannel)

        return message.channel.send(noLogChannel).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let muteRole = message.guild.roles.find(r => r.name === "Muted");
    if (!muteRole) {

        muteRole = await message.guild.createRole({

            name: "Muted",
            color: "#c7c7c7",
            permissions: []

        })

        message.guild.channels.forEach(async (channel, id) => {

            await channel.overwritePermissions(muteRole, {

                SEND_MESSAGES: false

            })
        });
    };

    let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Geen reden.";

    let noMutedUser = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`De gebruiker **${args[0]}** is niet gevonden..`)
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!mutedUser)

        return message.channel.send(noMutedUser).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let cantMuteModerator = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`Je kunt deze gebruiker niet muten, omdat hij/zij een stafflid is.`)
        .setTimestamp()
        .setFooter("CloudMC ");

    if (mutedUser.roles.find(r => r.name === staffRole))

        return message.channel.send(cantMuteModerator).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    var muteLog = new discord.RichEmbed()
        .setColor("#74DF00")
        .setAuthor(`🔇 ${message.guild} - Mutelog`)
        .setDescription("Een mute-log van iemand die de regels heeft overtreden.")
        .addField("Gemuted gebruiker", mutedUser.user.tag, true)
        .addField("Gemuted door", message.author.tag, true)
        .addField("Reden", reason, true)
        .setTimestamp()
        .setFooter("CloudMC ");

    logChannel.send(muteLog);

    var mutedUserSendMessage = new discord.RichEmbed()
        .setDescription(`Beste gebruiker,\n\nJe bent gemuted in **${message.guild.name}**, hierdoor zal je niet meer kunnen praten.\n\n**Executor »** ${message.author.tag}\n**Reden »** ${reason}.`)
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC ");

    await mutedUser.send(mutedUserSendMessage);

    message.delete()

    let muteSuccess = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`De gebruiker **${mutedUser.user.tag}** is succesvol gemuted.`)
        .setTimestamp()
        .setFooter("CloudMC ");

    let awaitMute = new discord.RichEmbed()
        .setColor("#74DF00")
        .setDescription(`**${mutedUser.user.tag}** aan het muten...`)
        .setTimestamp()
        .setFooter("CloudMC ");

    message.channel.send(awaitMute).then((awaitingMute) => {

        mutedUser.addRole(muteRole);

        setTimeout(function(){

            awaitingMute.edit(muteSuccess).then(

                msg => msg.delete(5000)
    
            );

        }, 2000);

    });

};

module.exports.help = {
    name: "/mute",
    description: "Mute an user from the discord.",
    usage: "/mute <@user> [reason]"
}