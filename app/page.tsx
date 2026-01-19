'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { isAddress, normalizeAddress, saveAddress } from '@/lib/address';

export default function LandingPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { address: connectedAddress, isConnected } = useAccount();

  const handlePasteAddress = () => {
    setError('');
    const trimmed = walletAddress.trim();
    
    if (!trimmed) {
      setError('Address is required');
      return;
    }

    if (!isAddress(trimmed)) {
      setError('Invalid address');
      return;
    }

    try {
      const normalized = normalizeAddress(trimmed);
      saveAddress(normalized);
      router.push(`/app/loading?address=${normalized}`);
    } catch (err) {
      setError('Invalid address format');
    }
  };

  const handleWalletConnected = async () => {
    if (connectedAddress) {
      try {
        const normalized = normalizeAddress(connectedAddress);
        saveAddress(normalized);
        router.push(`/app/loading?address=${normalized}`);
      } catch (err) {
        setError('Invalid wallet address');
      }
    }
  };

  // Use effect to handle wallet connection
  useEffect(() => {
    if (isConnected && connectedAddress) {
      handleWalletConnected();
    }
  }, [isConnected, connectedAddress]);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-text-primary mb-1">WalletStats</h1>
            <p className="text-sm text-text-secondary">
              See how you really trade
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-center">
              <ConnectButton />
            </div>
            
            <div classNam="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-bg text-text-secondary uppercase tracking-wider">OR</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Paste wallet address (view-only)"
                  value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePasteAddress();
                    }
                  }}
                  className="w-full px-4 py-3 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent placeholder:text-text-secondary"
                />
                {error && (
                  <p className="mt-1 text-xs text-negative">{error}</p>
                )}
              </div>
              <button
                onClick={handlePasteAddress}
                disabled={!walletAddress.trim()}
                className="w-full px-4 py-3 bg-surface border border-border text-text-primary text-sm hover:border-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Analyze Wallet
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/app/demo"
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              View demo mode
            </a>
          </div>
        </div>
        
        <div className="pb-6 text-center">
          <p className="text-xs text-text-secondary">
            Read-only. No transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
