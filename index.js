// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");
const connectDB = require("./config/dbConnect");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");
const mongoose = require("mongoose");
const { Console } = require("node:console");

//connect to mongoDB
connectDB();

mongoose.connection.once("open", () => {
  console.log("DB connected baby :D");
});

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  // console.log(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    if (interaction.commandName === "serverinfo") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "get_info") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "create_user") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "add_friend") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "remove_friend") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "apply") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "upload_resume") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "accept") {
      await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "accepted") {
        await interaction.deferReply();
      await command.execute(client, interaction, []);
    } else if (interaction.commandName === "reject") {
        await interaction.deferReply();
      await command.execute(client, interaction, []);
    }
    else {
      await command.execute(client, interaction, []);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  console.log(client.users);
});

// Log in to Discord with your client's token
client.login(token);
