export interface UserData {
  ipv4: string;
  ipv6: string;
  discordId: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}