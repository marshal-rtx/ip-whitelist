import { NodeSSH } from 'node-ssh';
import dotenv from 'dotenv';

dotenv.config();

const ssh = new NodeSSH();

async function connectSSH() {
  await ssh.connect({
    host: process.env.SERVER_IP,
    username: process.env.SSH_USERNAME,
    privateKey: process.env.SSH_PRIVATE_KEY
  });
}

export async function updateIptables(ipv4, ipv6, isNew = true) {
  try {
    await connectSSH();

    // Add/Update IPv4 rule
    if (ipv4) {
      if (!isNew) {
        // Remove old IPv4 rule first if updating
        await ssh.execCommand(`sudo iptables -D INPUT -s ${ipv4} -j ACCEPT`);
      }
      await ssh.execCommand(`sudo iptables -A INPUT -s ${ipv4} -j ACCEPT`);
    }

    // Add/Update IPv6 rule
    if (ipv6) {
      if (!isNew) {
        // Remove old IPv6 rule first if updating
        await ssh.execCommand(`sudo ip6tables -D INPUT -s ${ipv6} -j ACCEPT`);
      }
      await ssh.execCommand(`sudo ip6tables -A INPUT -s ${ipv6} -j ACCEPT`);
    }

    // Save rules
    await ssh.execCommand('sudo netfilter-persistent save');
    
    ssh.dispose();
    return true;
  } catch (error) {
    console.error('Error updating iptables:', error);
    ssh.dispose();
    return false;
  }
}