require('dotenv').config();
const { 
    Client, 
    GatewayIntentBits, 
    SlashCommandBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    ActionRowBuilder, 
    Events, 
    MessageFlags,
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle,
    PermissionsBitField,
    EmbedBuilder
} = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand() && interaction.commandName === 'vote') {

        const row = ActionRowBuilder (
            new ButtonBuilder().setCustomId('vote_1').setLabel('vote_1').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('vore_2').setLabel('vote_2').setStyle(ButtonStyle.Success),
        )
        await interaction.reply( `This weeks poll is ${weeklypoll}`);
    }
});

// Register Slash Commands
client.on('ready', async () => {
    const guild = client.guilds.cache.first();
    if (!guild) return console.error("❌ No guilds found.");

    await guild.commands.set([
        new SlashCommandBuilder().setName('vote').setDescription('Opens up the poll for the week'),
       
    ]);

    console.log(`🚀 Logged in as ${client.user.tag}`);
    console.log(`✅ /commands registered`);
});


client.login(process.env.TOKEN);