'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const router = useRouter();

  const handleConnect = (provider: 'metamask' | 'walletconnect' | 'manual') => {
    if (provider === 'manual') {
      if (walletAddress.trim()) {
        // Store wallet address (in real app, use context or state management)
        localStorage.setItem('walletAddress', walletAddress.trim());
        router.push('/analyze');
      }
    } else {
      // Placeholder for MetaMask/WalletConnect integration
      // In real app, implement wallet connection logic here
      const mockAddress = '0x' + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      localStorage.setItem('walletAddress', mockAddress);
      router.push('/analyze');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">WalletStats</h1>
          <p className="text-xs text-text-secondary uppercase tracking-wider">
            Read-only. No transactions.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => handleConnect('metamask')}
            className="w-full px-4 py-3 bg-surface border border-border text-text-primary text-sm hover:border-accent transition-colors"
          >
            Connect Wallet (MetaMask)
          </button>
          
          <button
            onClick={() => handleConnect('walletconnect')}
            className="w-full px-4 py-3 bg-surface border border-border text-text-primary text-sm hover:border-accent transition-colors"
          >
            Connect Wallet (WalletConnect)
          </button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-bg text-text-secondary uppercase tracking-wider">OR</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Paste wallet address (view-only)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-4 py-3 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent placeholder:text-text-secondary"
            />
            <button
              onClick={() => handleConnect('manual')}
              disabled={!walletAddress.trim()}
              className="w-full px-4 py-3 bg-surface border border-border text-text-primary text-sm hover:border-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Analyze Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

