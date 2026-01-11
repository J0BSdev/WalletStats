'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnalysisLoading from '@/components/AnalysisLoading';
import RealityCheckHero from '@/components/RealityCheckHero';
import BestPeriodCard from '@/components/BestPeriodCard';
import WorstPeriodCard from '@/components/WorstPeriodCard';
import BehaviorFlagCard from '@/components/BehaviorFlagCard';
import WhyYouLoseConclusion from '@/components/WhyYouLoseConclusion';
import DailySnapshot from '@/components/DailySnapshot';
import WeeklyInsight from '@/components/WeeklyInsight';
import { mockWalletData } from '@/lib/mockData';
import Link from 'next/link';

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if wallet is connected
    const walletAddress = localStorage.getItem('walletAddress');
    if (!walletAddress) {
      router.push('/');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 2 seconds per message × 3 messages

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return <AnalysisLoading />;
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">WalletStats</h1>
          <div className="text-xs text-text-secondary mt-1">Personal wallet performance analysis</div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/stats"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Stats
          </Link>
          <Link
            href="/timeline"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="/settings"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>

      <RealityCheckHero data={mockWalletData.realityCheck} />

      <DailySnapshot data={mockWalletData.dailySnapshot} />
      <WeeklyInsight data={mockWalletData.weeklyInsight} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <BestPeriodCard data={mockWalletData.bestPeriod} />
        <WorstPeriodCard data={mockWalletData.worstPeriod} />
        <BehaviorFlagCard data={mockWalletData.behaviorFlag} />
      </div>

      <WhyYouLoseConclusion data={mockWalletData.whyYouLose} />
    </div>
  );
}

