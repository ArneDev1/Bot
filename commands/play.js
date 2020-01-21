const discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops) => {

    // -play <url> + queue

    if (message.channel.id !== "651390270666965003") {

        let noBotChannel = new discord.RichEmbed()
            .setColor("#46803f")
            .setDescription("Gelieve dit commando uit te voeren in botcommands channel!")
            .setTimestamp()
            .setFooter("MoonMC - Music")

        return message.channel.send(noBotChannel).then(

            message.delete()

        ).then(

            msg => msg.delete(5000)

        );

    }

    let noVoiceConnection = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription("Je moet met een spraak-kanaal verbonden zijn.")
        .setTimestamp()
        .setFooter("MoonMC - Music")

    if (!message.member.voiceChannel) return message.channel.send(noVoiceConnection).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let noArgs = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription("Use /play <youtube-url>")
        .setTimestamp()
        .setFooter("MoonMC - Music")

    if (!args[0]) return message.channel.send(noArgs).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let validate = await ytdl.validateURL(args[0]);

    let noValidate = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription("Gelieve een geldige **youtube url** mee te geven.")
        .setTimestamp()
        .setFooter("MoonMC - Music")

    if (!validate) return message.channel.send(noValidate).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    // Maak een connectie met het kanaal als die er nog niet is.
    if (!data.connection) data.connection = await message.member.voiceChannel.join();

    // Voeg een queue aan de data.
    if (!data.queue) data.queue = [];

    // Geef het ID mee.
    data.guildID = message.guild.id;

    // Voeg de liedjes toe aan de lijst met volgende gegevens.
    // Titel, aanvrager, link, welk kanaal aangevraagd.

    data.queue.push({

        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id

    });

    // Als nog geen speelt dan roep play op anders gaan we enkel een bericht geven.

    if (!data.dispatcher) {

        Play(bot, ops, data);



    } else {

        let addedToQueue = new discord.RichEmbed()
            .setColor("#46803f")
            .setDescription(`Het liedje **${info.title}** is toegevoegd aan de **queue**.`)
            .setTimestamp()
            .setFooter("MoonMC - Music");

        message.channel.send(addedToQueue);

    }

    ops.active.set(message.guild.id, data);

}

/**
 *  
 *
 * @param {*} bot Gegevens van de bot.
 * @param {*} ops Opties die we meegeven. (Al de liedjes in de queue).
 * @param {*} data De data die we hebben opgevraagd.
 */
async function Play(bot, ops, data) {

    let playMusic = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Het liedje **${data.queue[0].songTitle}** is nu aan het spelen.`)
        .setTimestamp()
        .setFooter("MoonMC - Music");

    bot.channels.get(data.queue[0].announceChannel).send(playMusic);

    bot.channels.get(data.queue[0].announceChannel).setTopic(`Het liedje **${data.queue[0].songTitle}** is voor het laatst afgespeeld.`);

    let options = { seek: 2, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: "audioonly" }), options);
    
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function () {

        Finish(bot, ops, this);

    });

}

/**
 * 
 * 
 *
 * @param {*} bot Gegevens van de bot zelf
 * @param {*} ops Opties die we meegegeven. (Al de data)
 * @param {*} dispatcher Oproep data mee geven
 */
function Finish(bot, ops, dispatcher) {

    var fetchedData = ops.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if (fetchedData.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(bot, ops, fetchedData);

    } else { 

        ops.active.delete(dispatcher.guildID);

        let voiceChannel = bot.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (voiceChannel) voiceChannel.leave()

    }

}

module.exports.help = {
    name: "/play",
    description: "Play music in a channel",
    usage: "/play <url>"
}