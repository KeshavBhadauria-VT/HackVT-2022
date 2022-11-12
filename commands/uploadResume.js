const { SlashCommandBuilder, Collection} = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");
const Resume = require("../schemas/Resume");

module.exports = {
    data: new SlashCommandBuilder().setName("upload_resume")
    .setDescription("upload your resume here!").addAttachmentOption(option => 
        option.setName('resume').setDescription("upload your resume here!")
        .setRequired(true)
    )    
    
    ,
	async execute(client, interaction, args = []) {
        let userId = await interaction.user.id;
        //TODO: access database here 
        resume = await Resume.create({
            _id: userId,
            file: interaction.options.get("resume").value,
          });
        
		await interaction.editReply('file was sucsessfullt uploaded');
	},
};