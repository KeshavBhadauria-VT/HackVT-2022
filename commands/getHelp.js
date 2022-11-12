const { SlashCommandBuilder, Collection} = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('lists the commands for Application Stack'),
    async execute(client, interaction, args = []) {
        let commands = ``;
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
        commands += "Application Stacker: \n\n"

        for (const file of commandFiles) {
            const command = require(`./${file}`);
	commands += command.data.toJSON().name;
    commands += "\t\t"
    commands += command.data.toJSON().description;
    commands += "\n"
        }

        await interaction.reply(commands);
    },
};