const { SlashCommandBuilder } = require("discord.js");
const User = require('../schemas/User');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("gets everyone in the server"),
  /*
   * {client object} client -> passing in client for queries
   * {interaction} -> how you send different response signals
   * {string[]}args -> extra args.
   */
  async execute(client, interaction, args = []) {
    let info = ``;
    client.guilds.cache.forEach().then((g) => {
      g.members.cache.forEach(async (m) => {
        info += `${m.user.username}\n \tjoined: ${m.joinedAt}\n `;
        
        console.log(m.user.id);
        let user =  await User.findById(m.user.id);
        //let applications = m.user.applications;
        let following_me = user.following_me;

        info += "\tGhosted by" + `${await user.applies}` + "companies.\n";
        info += "\tRejected from " + `${await user.rejects}` + " companies.\n";
        info += "\tAccepted by " + `${await user.accepts}` + " companies. \n";
        info += "\tCompanies: \n";

        // for (const application of applications) {
        //   info += "\t\t" + application.company.name + ":\t";
        //   info += application.status + "\n";
        // }
        // info += "\tFollowing me: \n";
        // for (const friend of following_me) {
        //   info += "\t\t" + friend.name + "\n";
        // }

      });
    });
    await interaction.editReply(info);
  },
};
