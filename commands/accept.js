const {
  SlashCommandBuilder,
  Collection,
  UserFlagsBitField,
} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accept")
    .setDescription("change a application status")
    .addStringOption((option) =>
      option
        .setName("company")
        .setDescription("the company you accepted")
        .setRequired(true)
    ),
  async execute(client, interaction, args = []) {
    let user_that_called_command = await User.findById(interaction.user.id);
    let company = interaction.options.get("company").value;
    for (let i = 0; i < user_that_called_command.applications.length; i++) {
      if (user_that_called_command.applications[i].name === company) {
        user_that_called_command.applications[i].status = "accepted";
        user_that_called_command.accepts += 1;
        user_that_called_command.save();
        break;
      }
    }

    await interaction.editReply(`${user_that_called_command}`);
  },
};
