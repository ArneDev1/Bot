const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // -disconnect

    if (message.channel.id !== "651390270666965003") {

        let noBotChannel = new discord.RichEmbed()
            .setColor("#46803f")
            .setDescription("Gelieve dit commando te gebruiken in het #botcommands channel.")
            .setTimestamp()
            .setFooter("MoonMC - Music")

        return message.channel.send(noBotChannel).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    }

    var staffRole = global.staffRole;

    let noPermission = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Je hebt de benodigde **${staffRole}** role nodig om het command uit te voeren.`)
        .setTimestamp()
        .setFooter("MoonMC - Lusic");

    if (!message.member.roles.find(r => r.name === staffRole))

        return message.channel.send(noPermission).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    let noVoiceConnection = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Gelieve met een spraakkanaal te verbinden.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    if (!message.member.voiceChannel) return message.channel.send(noVoiceConnection).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let noBotVoiceConnection = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`De bot is niet met een spraakkanaal verbonden.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    if (!message.guild.me.voiceChannel) return message.channel.send(noBotVoiceConnection).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let noSameChannel = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Je bent niet met hetzelfde kanaal verbonden als de bot.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    if (message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send(noSameChannel).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let awaitForLeave = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Kanaal aan het verlaten...`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    let awaitSuccess = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Ik heb het kanaal succesvol verlaten.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    await message.channel.send(awaitForLeave).then((msg) => {

        setTimeout(function () {

            msg.edit(awaitSuccess);

            message.guild.me.voiceChannel.leave();

        }, 1000);

    });

};
module.exports.command = {
    name: "-embed",
    description: "Create a custom embed",
    usage: "-embed <color> <message>"
}