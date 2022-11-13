const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const User = require("../schemas/User");



module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("gets everyone in the server"),
  async execute(client, interaction, args = []) {
    let info = `Information:\n`;
    for await (const doc of User.find()) {

      info += `${doc.name}\n \tjoined: ${doc.createdAt}\n `;
      info += "\tGhosted by " + `${await doc.applies}` + " companies.\n";
      info += "\tRejected from " + `${await doc.rejects}` + " companies.\n";
      info += "\tAccepted by " + `${await doc.accepts}` + " companies. \n";
      let applications = await doc.applications;
      let following_me = await doc.following_me;
      info += "\tCompanies: \n";
      for (const application of applications) {
        info += "\t\t" + application.company.name + ":\t";
        info += application.status + "\n";
      }
      info += "\tFollowing me: \n";
      for (const friend of following_me) {
        info += "\t\t" + friend.name + "\n";
      }

      // use `doc`
    }
    await interaction.editReply(`${info}`);

  },
};
