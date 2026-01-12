'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAddressFromURL } from '@/lib/address';
import { AnalysisResponse, WalletAnalysisData } from '@/types';
import RealityCheckHero from '@/components/RealityCheckHero';
import BestPeriodCard from '@/components/BestPeriodCard';
import WorstPeriodCard from '@/components/WorstPeriodCard';
import BehaviorFlagCard from '@/components/BehaviorFlagCard';
import WhyYouLoseConclusion from '@/components/WhyYouLoseConclusion';
import DailySnapshot from '@/components/DailySnapshot';
import WeeklyInsight from '@/components/WeeklyInsight';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [address, setAddress] = useState<string | null>(null);
  const [data, setData] = useState<WalletAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const addr = getAddressFromURL(searchParams);
    
    if (!addr) {
      router.push('/');
      return;
    }

    setAddress(addr);

    const fetchData = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await fetch(
          `/api/analyze?address=${encodeURIComponent(addr)}&range=30&tz=${encodeURIComponent(timezone)}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Analysis failed');
        }

        const result: AnalysisResponse = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
        setLoading(false);
      }
    };

    fetchData();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
        <div className="text-sm text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 py-12">
          <p className="text-sm text-negative">{error}</p>
          <button
            onClick={() => {
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

  if (!data || !address) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-start justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">WalletStats</h1>
          <div className="text-sm text-text-secondary mt-1">See how you really trade</div>
          <div className="text-xs text-text-secondary mt-2">Read-only. No transactions.</div>
          <div className="text-xs text-text-secondary mt-2 font-mono">
            {address}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/app/stats?address=${encodeURIComponent(address)}`}
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Stats
          </Link>
          <Link
            href={`/app/timeline?address=${encodeURIComponent(address)}`}
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="/app/settings"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>

      <RealityCheckHero data={data.realityCheck} />

      <DailySnapshot data={data.dailySnapshot} />
      <WeeklyInsight data={data.weeklyInsight} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <BestPeriodCard data={data.bestPeriod} />
        <WorstPeriodCard data={data.worstPeriod} />
        <BehaviorFlagCard data={data.behaviorFlag} />
      </div>

      <WhyYouLoseConclusion data={data.whyYouLose} />
    </div>
  );
}

