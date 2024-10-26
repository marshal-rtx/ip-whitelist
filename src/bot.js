import { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { connectDB } from './database.js';
import { createWhitelistEmbed } from './utils/embedBuilder.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const WHITELIST_CHANNEL_ID = process.env.WHITELIST_CHANNEL_ID;
const WEBSITE_URL = process.env.WEBSITE_URL;

client.once('ready', async () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  await connectDB();
  
  // Send whitelist embed to channel
  const channel = await client.channels.fetch(WHITELIST_CHANNEL_ID);
  if (channel) {
    // Clear previous messages
    const messages = await channel.messages.fetch({ limit: 100 });
    await channel.bulkDelete(messages);
    
    // Create new whitelist message
    const embed = createWhitelistEmbed();
    const button = new ButtonBuilder()
      .setCustomId('whitelist_button')
      .setLabel('Whitelist My IP')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);
    await channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'whitelist_button') {
    const userId = interaction.user.id;
    const authUrl = `${WEBSITE_URL}/auth?userId=${userId}`;
    
    const dmEmbed = new EmbedBuilder()
      .setTitle('IP Whitelist Authentication')
      .setDescription(`Click [here](${authUrl}) to whitelist your IP address.\nThis link is unique to you and will expire in 10 minutes.`)
      .setColor('#5865F2');

    try {
      await interaction.user.send({ embeds: [dmEmbed] });
      await interaction.reply({ 
        content: 'Check your DMs for the whitelist link!', 
        ephemeral: true 
      });
    } catch (error) {
      await interaction.reply({ 
        content: 'Unable to send DM. Please enable DMs from server members.', 
        ephemeral: true 
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);