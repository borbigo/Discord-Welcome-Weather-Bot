/**
 * First npm init to make a package.json file
 * Second npm i discord.js to install discord package
 */


const Discord = require("discord.js")
const weather = require("weather-js")

//TOKEN below is inactive, will need to be replaced by user
const TOKEN = ""

module.exports = {
    name: "weather",
    description: "gets weather info from a location given",
    
    //returns a promise for run
    async run (bot, message, args) {
        weather.find({search: args.join(" "), degreeType: "F"}, function(error, result) {
            if (error) return message.channel.send(error);
            //makes sure a location is inputted
            if (!args[0]) return message.channel.send("Please specify a valid location.");
            //if location isn't valid
            if (result == undefined || result.length == 0) return message.channel.send("Invalid location");

            var current = result[0].current;
            var location = result[0].location;

            /**
             * Makes a new embed (the tags you see on Discord)
             * - sets color
             * - line for location
             * - thumbnail of weather
             * - description of weather
             * - timezone
             * - degree type (fahrenheit)
             * - temp
             * - wind
             * - feels like
             * - humidity
             * 
             * sends the embed into the channel 
             */
            const embed = new Discord.MessageEmbed()
            .setColor(0x111111)
            .setAuthor(`Weather Forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageURL)
            .setDescription(`**${current.skytext}**`)
            .addField("Timezone", `UTC ${location.timezone}`, true)
            .addField("Degree Type", "Fahrenheit", true)
            .addField("Temperature", `${current.temperature}`, true)
            .addField("wind", `${current.winddisplay}`, true)
            .addField("Feels like", `${current.feelslike}`, true)
            .addField("Humidity", `${current.humidity}`, true)

            message.channel.send(embed)
        })
    }
}

//create bot client to access the discord API
const client = new Discord.Client({
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

//login success event listener
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

//message listener
client.on("messageCreate", (message) => {
    if (message.content == "hi") {
        message.reply("Hello human.")
    } 
    if (message.content == "hello") {
        message.reply("Hello human.")
    }
    if (message.content == "weather") {
        client.commands.get("weather".execute(message, args))
    }
})

const welcomeID = "930309384351932456"
//user join
client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomeID).send(`<@${member.id}> Welcome to the server!`)
    //channels.cache is a cache of all channels on server
})

client.login(TOKEN)
