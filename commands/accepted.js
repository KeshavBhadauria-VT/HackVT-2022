const { SlashCommandBuilder, Collection, UserFlagsBitField} = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");
const User = require("../schemas/User");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('accepted')
        .setDescription('list the companies you were accepted by'),
	async execute(client, interaction, args = []) {

        let user_that_called_command = await User.findById(interaction.user.id);

        let str = `${user_that_called_command.name}\n`;
        for (let i = 0; i < user_that_called_command.applications.length; i++) {
            if (user_that_called_command.applications[i].status === "accepted") {
                str += `\tAccepted: ${user_that_called_command.applications[i].company.name}`;
            }
        }
		await interaction.editReply(`${str}`);
	},
};