const { SlashCommandBuilder, Client } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


async function getListType() {
    
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create a new list from scratch')
        /* by creating a slash command, we have created a CommandInteraction object which produces
            a ApplicationCommand object, which can have Options, which are effectivelty arguments for the command 
            I don't yet super understand where the .addStringOption/.addChannelOption methods come from exactly,
            but ApplicationCommandOptions have types that can restrict the type of input it will accept*/
        .addStringOption(option => 
            option.setName('category')
            // more info on ApplicationCommandOptions: https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandOption
                .setDescription('Category of list you would like to create.')
                // makes argument for command required
                .setRequired(true)
                // gives category options for list to be created
                .addChoices(
                    { name: 'Movies', value: 'movies'},
                    { name: 'Recipes', value: 'recipes'},
                    { name: 'TV Shows', value: 'tv'},
                    { name: 'To Do', value: 'to-do'},
                    { name: 'Miscellaneous', value: 'misc'},
                )
            ),
    async execute(interaction) {
        await interaction.deferReply();
        await getListType();
        await interaction.editReply('Sucess!');
    }
};
