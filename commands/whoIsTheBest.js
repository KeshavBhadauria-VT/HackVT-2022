const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('best')
		.setDescription('Tells you who is the best'),
	async execute(client, interaction, args = []) {
        
		await interaction.reply(`You are the best, @${interaction.user.tag}!`)
	},
};