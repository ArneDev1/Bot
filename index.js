const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    let statuses = [

        "play.moonmc.net",
        ".ticket"

    ]

    setInterval(function () {

        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, { type: "PLAYING" });

    }, 10000)

    global.staffRole = "Stafflid";

});


var fs = require("fs")
fs.readdir("commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Oops, no commands!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);
});


bot.login("NjY5MTkzODE4MTUwNTM1MTc4.XicRwg.H7r8aP9pNZcfBdbHdeg2V81cPCw");
