import React, { useState } from 'react';
import { Shield, Server, Lock, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthButton } from './components/AuthButton';
import { FeatureCard } from './components/FeatureCard';
import { WhitelistStatus } from './components/WhitelistStatus';
import { RoleVerification } from './components/RoleVerification';
import type { WhitelistData } from './types/auth';

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const [whitelistData, setWhitelistData] = useState<WhitelistData | null>(null);

  const handleDiscordLogin = () => {
    const redirectUri = `${window.location.origin}/callback`;
    const scope = 'identify guilds.members.read';
    
    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope,
    });

    window.location.href = `https://discord.com/api/oauth2/authorize?${params}`;
  };

  const handleRetry = () => {
    setIsAuthenticated(false);
    setHasRequiredRole(false);
    setWhitelistData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold">FiveM IP Whitelist</span>
            </div>
            <div className="flex items-center space-x-4">
              <Server className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Secure Your FiveM Server
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Protect your server with our advanced IP whitelist system. Connect with Discord to automatically register your IP.
            </p>
          </div>

          {!isAuthenticated ? (
            <AuthButton onClick={handleDiscordLogin} isLoading={isLoading} />
          ) : hasRequiredRole && whitelistData ? (
            <WhitelistStatus {...whitelistData} />
          ) : (
            <RoleVerification 
              serverName="FiveM Server"
              roleName="Whitelist Access"
              onRetry={handleRetry}
            />
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={Shield}
              title="Role Verification"
              description="Ensures only authorized Discord members with the required role can whitelist their IPs."
            />
            <FeatureCard
              icon={Server}
              title="Automatic IP Detection"
              description="Your IPv4 and IPv6 addresses are automatically detected and securely stored."
            />
            <FeatureCard
              icon={Lock}
              title="DDoS Protection"
              description="Advanced IP whitelisting system to prevent unauthorized access and DDoS attacks."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;