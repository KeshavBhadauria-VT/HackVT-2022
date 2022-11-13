const {
  SlashCommandBuilder,
  Collection,
  UserFlagsBitField,
  ApplicationFlagsBitField,
} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const User = require("../schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accept")
    .setDescription("change a application status")
    .addStringOption((option) =>
      option
        .setName("company")
        .setDescription("the company you want to apply to")
        .setRequired(true)
    ),
  async execute(client, interaction, args = []) {
    console.log(interaction.user.id);
    let user_that_called_command = await User.findById(interaction.user.id);
    if (user_that_called_command.applications == undefined) {
        await interaction.editReply(`haven't added any companies.`);
        return;
    }
    let company = interaction.options.get("company").value.toLowerCase();
    console.log(company);
    // let arr = [];
    // for await (const user of user_that_called_command.following_me) {
    //     arr.push(user._id);
    // }
    let flag = false;
    for (let i = 0; i < user_that_called_command.applications.length; i++) {
      console.log(user_that_called_command.applications[i].company);
      if (user_that_called_command.applications[i].company.name === company) {
        flag = true;
        user_that_called_command.applications[i].status = "accepted";
        user_that_called_command.accepts += 1;
        user_that_called_command.save();
        break;
      }
    }
    if (!flag) {
        await interaction.editReply(`companies not in the db`);

    } else {
        let followers = user_that_called_command.following_me;
        let i = 0;
        info = ``;
        for (const friend of followers) {
          info += `<@${followers[i]._id}>  `;
           i = i + 1;
    
        }
        await interaction.editReply( info + `I was accepted to ${company}`);

    }

  },
};
