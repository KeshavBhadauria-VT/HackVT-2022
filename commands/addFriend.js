const { SlashCommandBuilder } = require("discord.js");

const User = require("../schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_friend")
    .setDescription("add a friend")
    .addUserOption((option) =>
      option.setName("user").setDescription("adds a friend").setRequired(true)
    ),
  async execute(client, interaction, args = []) {
    // interaction.user.tag get the person who called the command
    // interaction.options.getUser('user').id gets the user mentioned

    // add a friend to the interaction.user.tag
    let user = await User.findById(interaction.options.getUser('user').id);
	let second_user = await User.findById(interaction.user.id);

    await user.following_me.push(second_user);
    await user.save();
	await interaction.editReply(`${user.name} new profile looks like:${user}`);
  },
};
