const { SlashCommandBuilder, Collection} = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('withdraw_app')
        .setDescription('withdraw an application')
                .addUserOption(option => 
                    option.setName('user')
                    .setDescription('the user you want information from')
                    .setRequired(true))
                .addUserOption(option =>
                    option.setName('app')
                    .setDescription('application you want to withdraw')
                    .setRequired(true)),
            async execute(client, interaction, args = []) {
                let guild_member = await interaction.guild.members.cache.get(`${interaction.options.getUser('user').id}`);
                //TODO: access database here 
                
                await interaction.editReply(`${guild_member.user.username}\n \t withdrew application with id `);
            },
        };