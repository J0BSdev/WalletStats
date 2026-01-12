'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

// Get project ID - use a placeholder if not set (will show error but won't crash)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '00000000000000000000000000000000';

export const config = getDefaultConfig({
  appName: 'WalletStats',
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

