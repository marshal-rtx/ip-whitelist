export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

export interface WhitelistData {
  ipv4: string;
  ipv6: string;
  discordId: string;
  username: string;
}