import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function AuthButton({ onClick, isLoading }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center space-x-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <img 
            src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_white_RGB.png" 
            alt="Discord" 
            className="w-6 h-6" 
          />
          <span>Connect with Discord</span>
        </>
      )}
    </button>
  );
}