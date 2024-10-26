import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { WhitelistData } from '../types/auth';

export function WhitelistStatus({ ipv4, ipv6, discordId, username }: WhitelistData) {
  return (
    <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm w-full max-w-2xl border border-green-500/20">
      <div className="flex items-center space-x-3 text-green-400 mb-6">
        <ShieldCheck className="w-6 h-6" />
        <span className="text-xl font-medium">IP Successfully Whitelisted</span>
      </div>
      <div className="space-y-4">
        <div className="bg-black/20 p-4 rounded-lg border border-white/5">
          <p className="text-gray-400 text-sm mb-1">Discord Username</p>
          <p className="font-medium">{username}</p>
        </div>
        <div className="bg-black/20 p-4 rounded-lg border border-white/5">
          <p className="text-gray-400 text-sm mb-1">IPv4 Address</p>
          <p className="font-mono">{ipv4}</p>
        </div>
        <div className="bg-black/20 p-4 rounded-lg border border-white/5">
          <p className="text-gray-400 text-sm mb-1">IPv6 Address</p>
          <p className="font-mono">{ipv6}</p>
        </div>
        <div className="bg-black/20 p-4 rounded-lg border border-white/5">
          <p className="text-gray-400 text-sm mb-1">Discord ID</p>
          <p className="font-mono">{discordId}</p>
        </div>
      </div>
    </div>
  );
}