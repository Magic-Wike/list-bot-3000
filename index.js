const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, Events, BaseInteraction } = require('discord.js');
const { token, prefix } = require('./config.json');
const fetch = require('node-fetch');

const bitchEmoji = '<:bitchiloveyou:1047169525365346335>';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// creates a new collection object which will contain all of our slash commands
client.commands = new Collection();

// uses node.path to join project directory (__dirname) with 'commands' folder, which contatins all slash commands
const commandsPath = path.join(__dirname, 'commands');
// uses node.fs to get array of all files in commandPath (readdirSync). Filters for only .js files
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// loops through all the .js files in our array and adds each command into 'commands' Collection
for (const file of commandFiles) { 
    // similar to above, using node.join to get file paths for individual .js files in array..
    const filePath = path.join(commandsPath, file);
    // ...and stores node.requires in command variable to be added to Collection
    const command =  require(filePath);
    // all slash commands export a data and execute property. if the .js containts these, it is a command and should be added to Collection
    if ('data' in command && 'execute' in command) {
        // .set() is Collection method that takes args (key, value)
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

/* following similar approach to above, setting up file paths and loops to read all of the files in the 
    'events' folder. */

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);

    const event = require(filePath);
    /* another weird one for my nub eyes...Client class extends the EventEmitter class, therefore, Client object can
        trigger .on() and .once() methods. these take 2 args: event name and a callback function... */
    // if the event object being imported contains a 'once' property, it is intended to be run once and therefore we handle differently..
    if (event.once) {
        // .name is a propert of the EventListener function being imported 
        client.once(event.name, (...args) => event.execute(...args));
    // if no once property, execute function will be called on every instance of event
    } else {
        // the '...' are *rest* and *spread* syntax. they are effectively opposites...
        /* rest takes zero-unlimited args and reduced them into an object, which is then passed to
            the execute() function and spread expands this object to execute zero-inf args */
        client.on(event.name, (...args) => event.execute(...args));
    }
};


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

});







client.login(token);