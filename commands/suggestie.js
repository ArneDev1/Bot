const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !suggestie <bericht>

    let suggestion = args.join(" ");

    let noArgs = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription("Gebruik */idee <bericht>*")
        .setTimestamp()
        .setFooter("MoonMC - Idee");

    if (!args[0]) return message.channel.send(noArgs).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let suggestionChannel = message.guild.channels.find(c => c.name === "ideeën");

    let noSuggestionChannel = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription("Het suggestie kanaal is niet gevonden..")
        .setTimestamp()
        .setFooter("MoonMC - Idee");

    if (!suggestionChannel) return message.channel.send(noSuggestionChannel).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );

    let suggestionMessage = new discord.RichEmbed()
        .setColor("#46803f")
        .setAuthor(`MoonMC - Idee`)
        .setDescription(suggestion)
        .setTimestamp()
        .setFooter(`Idee ingezonden door ${message.author.tag}`);

    await suggestionChannel.send(suggestionMessage).then((suggestionReact) => {

        suggestionReact.react(`✅`)

        setTimeout(function() {

            suggestionReact.react(`❌`)

        }, 1000)
        

    });

    let suggestionSuccess = new discord.RichEmbed()
        .setColor("#46803f")
        .setDescription(`Het idee is succesvol ingezonden.`)
        .setTimestamp()
        .setFooter("MoonMC - Idee");

    message.channel.send(suggestionSuccess).then(

        message.delete()

    ).then(

        msg => msg.delete(5000)

    );


}
module.exports.help = {
    name: "/idee",
    description: "Suggest an idea",
    usage: "/idee <bericht>"
}