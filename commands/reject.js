const {
    SlashCommandBuilder,
    Collection,
    UserFlagsBitField,
  } = require("discord.js");
  const fs = require("node:fs");
  const path = require("node:path");
  const User = require("../schemas/User");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("reject")
      .setDescription("change a application status to reject")
      .addStringOption((option) =>
        option
          .setName("company")
          .setDescription("the company you want to apply to")
          .setRequired(true)
      ),
    async execute(client, interaction, args = []) {
      console.log(interaction.user.id);
      let user_that_called_command = await User.findById(interaction.user.id);
      let company = interaction.options.get("company").value.toLowerCase();
      console.log(company);
      for (let i = 0; i < user_that_called_command.applications.length; i++) {
          console.log(user_that_called_command.applications[i].company);
        if (user_that_called_command.applications[i].company.name === company) {
          user_that_called_command.applications[i].status = "rejected";
          user_that_called_command.accepts += 1;
          user_that_called_command.save();
          break;
        }
      }
  
      await interaction.editReply(`${user_that_called_command}`);
    },
  };
  