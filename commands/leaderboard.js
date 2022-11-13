const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const User = require("../schemas/User");



module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("top leaderboards"),
  async execute(client, interaction, args = []) {
    let info = `Information:\n`;
    for await (const doc of User.find()) {
        info += `${doc.name}\n \tjoined: ${doc.createdAt}\n `;
        info += "\tGhosted by" + `${await doc.applies}` + "companies.\n";
        info += "\tRejected from " + `${await doc.rejects}` + " companies.\n";
        info += "\tAccepted by " + `${await doc.accepts}` + " companies. \n";
        info += "\tCompanies: \n";

        // use `doc`
    }
    await interaction.editReply(`${info}`);

  },
};
