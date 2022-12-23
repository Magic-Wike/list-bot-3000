const { Events } = require('discord.js');

// reports that bot is up and running

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)
    }
};
