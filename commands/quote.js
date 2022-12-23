const fetch = require('node-fetch');


const { SlashCommandBuilder } = require('discord.js');

async function getRandomQuote() {
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

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('quote')
        .setDescription('generates a random quote from ZenQuotes API'),
    async execute(interaction) {
        /* slash commands have 3 seconds to get a response or they will time out, instead we need to 
            defer the reply in one of 3 ways, each of which will give 15 min for a response. this is one of those methods
            for more info check out: https://stackoverflow.com/questions/67413046/slash-commands-unknown-interaction */
        await interaction.reply({content: 'Finding the perfect (random) quote...', ephemeral: true});
        const quote = await getRandomQuote();
        // followUp is a method for any interaction
        await interaction.followUp(quote);
    },
}