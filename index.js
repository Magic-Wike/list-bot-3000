const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix } = require('./config.json');
const fetch = require('node-fetch');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', message => {
    let tag = message.member.user.tag;
    let id = message.member.id;
    let displayName = message.member.displayName;
    // log every message to the console
    console.log(tag + ": " +message.content);
    // if (message.content.includes("baby")) {
    //     message.reply('Bitch, I love you.');
    // }
    if (message.content === "$")
})

client.login(token);