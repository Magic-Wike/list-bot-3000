const { SlashCommandBuilder, Client } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const categories = ['movies', 'recipes', 'tv-shows', 'to-do', 'misc'];

async function getListType() {
    
}

module.exports = {
    data: new SlashCommandBuilder
        .setName('create')
        .setDescription('Create a new list from scratch'),
    async execute(interaction) {
        await interaction.deferReply();
        await getListType();
        await interaction.editReply('Sucess!');
    }
}
