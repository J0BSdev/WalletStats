'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAddressFromURL } from '@/lib/address';
import { AnalysisResponse } from '@/types';

const messages = [
  'Fetching your transactions...',
  'Analyzing performance...',
  'Detecting behavior patterns...',
];

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const address = getAddressFromURL(searchParams);
    
    if (!address) {
      router.push('/');
      return;
    }

    // Sequential messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    // Start analysis fetch immediately
    const fetchAnalysis = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await fetch(
          `/api/analyze?address=${encodeURIComponent(address)}&range=30&tz=${encodeURIComponent(timezone)}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Analysis failed');
        }

        const data: AnalysisResponse = await response.json();
        
        // Navigate to dashboard with address and data
        router.push(`/app/dashboard?address=${encodeURIComponent(address)}`);
      } catch (err) {
        clearInterval(messageInterval);
        setError(err instanceof Error ? err.message : 'Analysis failed');
      }
    };

    fetchAnalysis();

    return () => clearInterval(messageInterval);
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <p className="text-sm text-negative mb-4">{error}</p>
          <button
            onClick={() => {
              const address = getAddressFromURL(searchParams);
              if (address) {
                router.push(`/app/loading?address=${encodeURIComponent(address)}`);
              } else {
                router.push('/');
              }
            }}
            className="px-4 py-2 bg-surface border border-border text-text-primary text-sm hover:border-accent transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-3">
        {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
          <p
            key={index}
            className={`text-sm text-text-secondary transition-opacity duration-500 ${
              index === currentMessageIndex ? 'opacity-100 text-text-primary' : 'opacity-50'
            }`}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}

