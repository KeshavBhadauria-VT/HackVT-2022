const { SlashCommandBuilder } = require("discord.js");

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
    let users = ``;
    client.guilds.cache.forEach((g) => {
      g.members.cache.forEach((m) => {
        users += `${m.user.username}\n \tjoined: ${m.joinedAt}\n \tapplied to X companies\n \tX acceptance\n \tX Ghosts\n \tX Rejections\n`;
      });
    });
    await interaction.editReply(users);
  },
};
