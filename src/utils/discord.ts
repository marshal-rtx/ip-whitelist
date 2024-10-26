const DISCORD_API_URL = 'https://discord.com/api/v10';

export async function checkUserRole(accessToken: string, guildId: string, roleId: string): Promise<boolean> {
  try {
    const response = await fetch(`${DISCORD_API_URL}/users/@me/guilds/${guildId}/member`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.roles.includes(roleId);
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

export async function getUserIPs(): Promise<{ ipv4: string; ipv6: string }> {
  try {
    const [ipv4Response, ipv6Response] = await Promise.all([
      fetch('https://api.ipify.org?format=json'),
      fetch('https://api64.ipify.org?format=json')
    ]);

    const ipv4Data = await ipv4Response.json();
    const ipv6Data = await ipv6Response.json();

    return {
      ipv4: ipv4Data.ip,
      ipv6: ipv6Data.ip
    };
  } catch (error) {
    console.error('Error fetching IPs:', error);
    return { ipv4: '', ipv6: '' };
  }
}