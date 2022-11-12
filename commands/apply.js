const { SlashCommandBuilder, Collection } = require("discord.js");

const Company = require("../schemas/Company");
const Application = require("../schemas/Application");
const User = require("../schemas/User");

// const fs = require('node:fs');
// const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("register that you've applied to a company")
    .addStringOption((option) =>
      option
        .setName("company")
        .setDescription("the company you want to apply to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("url").setDescription("application link").setRequired(true)
    ),
  async execute(client, interaction, args = []) {
    let user_that_called_command = await User.findById(interaction.user.id);
    console.log(interaction.options.get("company").value);
    let company = null;
    let flag = await Company.exists({name: interaction.options.get("company").value});
    if (!flag) {
      company = await Company.create({
        _id: interaction.options.get("company").value,
        name: interaction.options.get("company").value,
        url: interaction.options.get("url").value,
      });
    } else {

      company = await Company.findById(
        interaction.options.get("company").value
      );
    }

    console.log(company);
    const application = await Application.create({
      url: interaction.options.get("url").value,
      company: company,
    });

    user_that_called_command.applications.push(application);
    user_that_called_command.applies += 1;
    user_that_called_command.save();
    await interaction.editReply(`${application} added`);

    //TODO: access database here
  },
};
