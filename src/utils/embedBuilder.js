import { EmbedBuilder } from 'discord.js';

export function createWhitelistEmbed() {
  return new EmbedBuilder()
    .setTitle('FiveM Server IP Whitelist')
    .setDescription('Click the button below to whitelist your IP address for our FiveM server.\n\n**Requirements:**\n• Must be a member of this server\n• Must have DMs enabled\n\n**Note:** Your IP will be automatically updated if it changes.')
    .setColor('#5865F2')
    .setFooter({ text: 'FiveM IP Whitelist System' });
}