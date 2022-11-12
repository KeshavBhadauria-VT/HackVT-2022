const { SlashCommandBuilder } = require('discord.js');
const User = require('../schemas/User');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_info')
		.setDescription('Gets a particular person info')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('the user you want information from')
            .setRequired(true)),
	async execute(client, interaction, args = []) {
        let guild_member = await interaction.guild.members.cache.get(`${interaction.options.getUser('user').id}`);
		const user = await User.findById(interaction.options.getUser('user').id);

        
		await interaction.editReply(`${guild_member.user.username}\n \tjoined: ${guild_member.joinedAt}\n \tapplied to X companies\n \tX acceptance\n \tX Ghosts\n \tX Rejections\n`);
	},
};