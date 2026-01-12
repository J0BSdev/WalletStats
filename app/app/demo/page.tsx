'use client';

import { mockWalletData } from '@/lib/mockData';
import RealityCheckHero from '@/components/RealityCheckHero';
import BestPeriodCard from '@/components/BestPeriodCard';
import WorstPeriodCard from '@/components/WorstPeriodCard';
import BehaviorFlagCard from '@/components/BehaviorFlagCard';
import WhyYouLoseConclusion from '@/components/WhyYouLoseConclusion';
import DailySnapshot from '@/components/DailySnapshot';
import WeeklyInsight from '@/components/WeeklyInsight';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-start justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">WalletStats</h1>
          <div className="text-sm text-text-secondary mt-1">See how you really trade</div>
          <div className="text-xs text-text-secondary mt-2">Read-only. No transactions.</div>
          <div className="text-xs text-text-secondary mt-2">
            Demo Mode (Mock Data)
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Analyze Real Wallet
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

