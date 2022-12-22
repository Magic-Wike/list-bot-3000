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

function getRandomQuote() {
    return fetch('https://zenquotes.io/api/random')
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(data => {
            // console.log(data[0]);
            return data[0]["q"] + "\n- "+data[0]["a"];
        })
}

client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', message => {
    let tag = message.member.user.tag;
    let id = message.member.id;
    let displayName = message.member.displayName;

    // let channel = message.channel;
    // let channelID = message.channelId;
    // console.log(channel);
    // console.log(channelID);

    // log every message to the console
    console.log(tag + ": " +message.content);
    if (message.content.includes("baby")) {
        message.reply('Bitch, I love you.');
    }
    if (message.content === '$quote') {
        console.log('Quote requested...fetching...')
        getRandomQuote().then(quote => message.channel.send(quote));
    }
})

client.login(token);