const weather = require("weather-js")

const Discord = require("discord.js")

module.exports = {
    name: "weather",
    description: "gets weather info from a location given",
    
    async run (bot, message, args) {
        weather.find({search: args.join(" "), degreeType: "F"}, function(error, result) {
            if (error) return message.channel.send(error);
            if (!args[0]) return message.channel.send("Please specify a valid locaition.");
            if (result == undefined || result.length == 0) return message.channel.send("Invalid location");

            var current = result[0].current;
            var location = result[0].location;

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