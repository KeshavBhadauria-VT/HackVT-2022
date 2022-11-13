const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const User = require("../schemas/User");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_user')
		.setDescription('Creates user info')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('user you want to create')
            .setRequired(true)),
	async execute(client, interaction, args = []) {
        let guild_member = await interaction.guild.members.cache.get(`${interaction.options.getUser('user').id}`);
        
        const user = await User.create({
            _id: interaction.options.getUser('user').id, 
            name: guild_member.user.username,
            createdAt: guild_member.joinedAt,
            applications: undefined
        });

        
		await interaction.editReply(`${user}`);
	},
};