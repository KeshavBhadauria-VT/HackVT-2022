const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const User = require("../schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("top leaderboards"),
  async execute(client, interaction, args = []) {
    let info = `Down bad leaderboard:\n`;
    let most_info = `Most applied:\n`;
    let smartest_info = `Most acceptances:\n`;
    let downBad = await User.find({});
    let mostDesperate = await User.find({});
    let smartest = await User.find({});

    await downBad.sort((a, b) => parseFloat(b.rejects) - parseFloat(a.rejects));

    await mostDesperate.sort(
      (a, b) => parseFloat(b.applies) - parseFloat(a.applies)
    );

    await smartest.sort(
      (a, b) => parseFloat(b.accepts) - parseFloat(a.accepts)
    );

    for await (const doc of downBad) {
      info += `${doc.name}\n \tjoined: ${doc.createdAt}\n `;
      info += "\tRejected from " + `${await doc.rejects}` + " companies.\n";
      info += "\tCompanies: \n";
      let applications = await doc.applications;
      for (const application of applications) {
        if (application.status == "rejected") {
          info += "\t\t" + application.company.name + ":\t";
          info += application.status + "\n";
        }
      }
    }

    for await (const doc of smartest) {
        smartest_info += `${doc.name}\n \tjoined: ${doc.createdAt}\n `;
        smartest_info += "\tOffers from " + `${await doc.accepts}` + " companies.\n";
        smartest_info += "\tCompanies: \n";
      let applications = await doc.applications;
      for (const application of applications) {
        if (application.status == "accepted") {
            smartest_info += "\t\t" + application.company.name + ":\t";
            smartest_info += application.status + "\n";
        }
      }
    }
    for await (const doc of mostDesperate) {
        most_info += `${doc.name}\n \tjoined: ${doc.createdAt}\n `;
        most_info += "\tApplied to " + `${await doc.applies}` + " companies.\n";
        most_info += "\tCompanies: \n";
      let applications = await doc.applications;
      for (const application of applications) {
        most_info += "\t\t" + application.company.name + ":\t";
        most_info += application.status + "\n";
      }
    }
    await interaction.editReply(
      `\`\`\`${info}\`\`\`` +
        `\`\`\`${most_info}\`\`\`` +
        `\`\`\`${smartest_info}\`\`\``
    );
  },
};
