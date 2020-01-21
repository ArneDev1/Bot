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

    let noGuildData = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription("Er speelt geen muziek af op dit moment.")
        .setTimestamp()
        .setFooter("MoonMC - Music")

    if (!guildIDData) return message.channel.send(noGuildData).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let queue = guildIDData.queue;
    let nowPlaying = queue[0];

    var responsePlaying = `Nu aan het spelen **${nowPlaying.songTitle}**. 🎶\n\n**🎶 | QUEUE**\n`;

    let responsePlayingError = `Er is geen **queue**, omdat er maar 1 liedje in staat.`

    try {

        for (var i = 0; i < queue.length; i++) {
 
            responsePlaying += `**${i}**, ${queue[i].songTitle}\n`;
     
        };

    } catch (err) {

        let responsePlayingErr = new discord.RichEmbed()
            .setColor("#46803f")
            .setDescription(responsePlayingError)
            .setTimestamp()
            .setFooter("MoonMC - Music");

        return message.channel.send(responsePlayingErr).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    }

    let response = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(responsePlaying)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    message.channel.send(response);

}

module.exports.help = {
    name: "/list",
    description: "See the queue of all music songs"
}