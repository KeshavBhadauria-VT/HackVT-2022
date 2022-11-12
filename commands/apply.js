const { SlashCommandBuilder, Collection} = require("discord.js");
// const fs = require('node:fs');
// const path = require("node:path");

const mongoose = require("mongoose");

//connect to mongoDB
connectDB();


// mongoose.connection.once('open', () => {
//     console.log("DB connected baby :D");
// });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apply')
        .setDescription('register that you\'ve applied to a company')
                .addUserOption(option => 
                    option.setName('company')
                    .setDescription('the company you want to apply to')
                    .setRequired(true))
                .addUserOption(option =>
                    option.setName('url')
                    .setDescription('application link')
                    .setRequired(true)),
            async execute(client, interaction, args = []) {
                let guild_member = await interaction.guild.members.cache.get(`${interaction.options.getUser('user').id}`);
                //TODO: access database here 
                
                await interaction.editReply(`${guild_member.user.username}\n \t applied to `);
            },
        };