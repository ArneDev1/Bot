const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

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

        }, 1000);

    });

};
module.exports.help = {
    name: "-test",
    description: "Let the bot leave the channel",
    usage: "-test"
}