const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -unban <@user>

    let botHasNoPermission = new discord.RichEmbed()
        .setDescription(`Ik heb onvoldoende permissies om het commando uit te voeren.`)
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(botHasNoPermission).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    var staffRole = global.staffRole;

    let noPermission = new discord.RichEmbed()
        .setDescription(`Je hebt de benodigde **${staffRole}** role nodig om dit command uit te voeren.`)
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!message.member.roles.find(r => r.name === staffRole))

        return message.channel.send(noPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let noArgs = new discord.RichEmbed()
        .setDescription("Gebruik *-unban <user-id>*")
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!args[0]) return message.channel.send(noArgs).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let unbannedUser = await bot.fetchUser(args[0]);

    let noUnbannedUser = new discord.RichEmbed()
        .setDescription(`De gebruiker **${args[0]}** is niet gevonden..`)
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!unbannedUser) message.channel.send(noUnbannedUser).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let logChannel = message.guild.channels.find(c => c.name === "staff-logs");

    var noLogChannel = new discord.RichEmbed()
        .setDescription(`Het log-kanaal is niet gevonden..`)
        .setColor("#74DF00")
        .setTimestamp()
        .setFooter("CloudMC ");

    if (!logChannel) return message.channel.send(noLogChannel).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    try {

        await message.guild.unban(unbannedUser)

        let unbanSuccess = new discord.RichEmbed()
            .setDescription(`Succesvol de ban van **${unbannedUser.tag}** verwijderd.`)
            .setColor("#74DF00")
            .setTimestamp()
            .setFooter("CloudMC ");

        message.channel.send(unbanSuccess).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

        let unbanLog = new discord.RichEmbed()
            .setAuthor(`🔨 ${message.guild} - Unbanlog`)
            .setDescription("Een unban-log van iemand die unbanned is van de guild.")
            .addField("Verbannen gebruiker", unbannedUser.tag, true)
            .addField("Unbanned door", message.author.tag, true)
            .setTimestamp()
            .setFooter("CloudMC ");

        logChannel.send(unbanLog);

    } catch (err) {

        let errorMsg = new discord.RichEmbed()
            .setDescription(`Gebruik het **user-id**.`)
            .setColor("#74DF00")
            .setTimestamp()
            .setFooter("CloudMC ");

        message.channel.send(errorMsg).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );


    };

};
module.exports.help = {
    name: "/unban",
    description: "Unbans a member from the discord.",
    usage: "/unban <@user>"
}