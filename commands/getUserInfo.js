const { SlashCommandBuilder } = require('discord.js');
const User = require('../schemas/User');
const Application = require('../schemas/Application');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_info')
		.setDescription('Gets a particular person info')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('the user you want information from')
            .setRequired(true)),
			
	async execute(client, interaction, args = []) {
		let info = ``;
        let guild_member = await interaction.guild.members.cache.get(`${interaction.options.getUser('user').id}`);
		let user = await User.findById(interaction.options.getUser('user').id);

		let applications = await user.applications;
		let following_me = await user.following_me;
		let applies = await user.applies;
		let rejects = await user.rejects;
		let accepts = await user.accepts;

		info += "Ghosted by " +applies + " companies.\n";
		info += "Rejected from " + rejects + " companies.\n";
		info += "Accepted by " + accepts + " companies. \n";
		info += "Companies: \n"

		for (const application of applications){
			info += "\t" +application.company.name + ":\t";
			info += application.status + "\n";
		}
		info += "Friends: \n";
		for(const friend of following_me){
			info += friend.name + "\n";
		}
        
		await interaction.editReply(`${guild_member.user.username}: \n\n` + `\`\`\`${info}\`\`\``);
	},
};