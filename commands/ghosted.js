const { SlashCommandBuilder, Collection} = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ghosted')
        .setDescription('list the companies you are still waiting on a response from')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('the user you want information from')
            .setRequired(true)),
	async execute(client, interaction, args = []) {
        let guild_member = await interaction.guild.members.cache.get(`${interaction.options.getUser('user').id}`);
        //TODO: access database here 
        
		await interaction.editReply(`${guild_member.user.username}\n \t ghosted by: `);
	},
};