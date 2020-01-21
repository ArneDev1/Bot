const discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

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

    let guildIDData = ops.active.get(message.guild.id);

    let noPlayMusic = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Er speelt geen liedje af op dit moment`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    if (!guildIDData) return message.channel.send(noPlayMusic).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let noSameChannel = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Je zit niet in het zelfde kanaal als de bot.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(noSameChannel).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let skipSuccess = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`**${message.author.tag}** heeft geskipt naar het volgende liedje.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    message.channel.send(skipSuccess);

    return guildIDData.dispatcher.emit("end");

}

module.exports.help = {
    name: "/skip",
    description: "Skip een liedje"
}