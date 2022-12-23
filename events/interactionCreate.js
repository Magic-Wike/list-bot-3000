const { Events } = require('discord.js');

module.exports = {
    // listener for interactions...if the interaction is a slash command, will find and execute that command
    name: Events.InteractionCreate,
    async execute(interaction) {
         /* there are many different types of interaction Classes in discord.js. ChatInputCommandInteraction is one.
       isChatInputCommand is a method of BaseInteraction class (most basic interaction) that returns boolean if is ^^
        -- 
        */
        if (!interaction.isChatInputCommand()) return;
        // console.log(interaction);
        /* a little confusing, so writing this out.. all this does is get a string of our command name..
            -remember that we know at this point that interaction variable here is a ChatInputCommand, which has a property of commandName
            -.get is a method for the Collection class...takes key as argument
            -.client is a property of any interaction (BaseInteraction), so we access our client through the interaction, which we know
            both has a 'commands' property we created eariler, and a commandName property because, again..ChatInputCommand */
        const command = interaction.client.commands.get(interaction.commandName);
        // handles error if command is not in our commands Collection
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
        }
        // attempt to execute the command. we declared execute function within individual command .js file
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
}


/* original way this function was declared before being moved to Events folder and set up for export
    keeping it here for reference.

client.on(Events.InteractionCreate, async interaction => {
   

});

*/ 