const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("top leaderboards"),
  async execute(client, interaction, args = []) {
    
    const guild = client.guilds.resolve("1040781771853267115");
    guild.members.fetch({force: true}).then((m) => {
        console.log(m);
    });
    await interaction.reply("sup");
  },
};
