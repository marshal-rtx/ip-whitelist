import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface RoleVerificationProps {
  serverName: string;
  roleName: string;
  onRetry: () => void;
}

export function RoleVerification({ serverName, roleName, onRetry }: RoleVerificationProps) {
  return (
    <div className="bg-red-500/10 p-8 rounded-lg backdrop-blur-sm w-full max-w-2xl border border-red-500/20">
      <div className="flex items-center space-x-3 text-red-400 mb-6">
        <ShieldAlert className="w-6 h-6" />
        <span className="text-xl font-medium">Access Denied</span>
      </div>
      <p className="text-gray-300 mb-4">
        You don't have the required role to whitelist your IP. Please make sure:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
        <li>You are a member of <span className="font-semibold text-white">{serverName}</span></li>
        <li>You have the <span className="font-semibold text-white">{roleName}</span> role</li>
      </ul>
      <button
        onClick={onRetry}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}