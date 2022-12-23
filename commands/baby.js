// baby response command. super basic bitch things.

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('baby')
        .setDescription('tells that bitch I love her.'),
    async execute(interaction) {
        await interaction.reply('Bitch, I love you <:bitchiloveyou:1047169525365346335>');
    }
}