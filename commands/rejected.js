const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const User = require("../schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rejected")
    .setDescription("list the companies you were rejected from")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you want information from")
        .setRequired(true)
    ),
  async execute(client, interaction, args = []) {
    let user_that_called_command = await User.findById(interaction.user.id);

    let str = `${user_that_called_command.name}\n`;
    for (let i = 0; i < user_that_called_command.applications.length; i++) {
      if (user_that_called_command.applications[i].status === "rejected") {
        str += `\tRejected: ${user_that_called_command.applications[i].company.name}\n`;
      }
    }
    await interaction.reply(`${str}`);
  },
};
