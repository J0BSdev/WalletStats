import { BehaviorFlagData } from '@/types';

interface BehaviorFlagCardProps {
  data: BehaviorFlagData;
}

const flagLabels: Record<BehaviorFlagData['flagType'], string> = {
  overtrading: 'Overtrading',
  revenge_trading: 'Revenge Trading',
  fomo: 'FOMO',
  panic_selling: 'Panic Selling',
};

const flagDescriptions: Record<BehaviorFlagData['flagType'], string> = {
  overtrading: 'detected after losses',
  revenge_trading: 'detected after losses',
  fomo: 'detected on market moves',
  panic_selling: 'detected during downturns',
};

export default function BehaviorFlagCard({ data }: BehaviorFlagCardProps) {
  return (
    <div className="bg-surface border border-border p-5 flex flex-col">
      <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">BEHAVIOR PATTERN</div>
      <div className="flex-1 mb-4">
        <div className="text-2xl font-bold text-text-primary mb-2">+{data.changePercent}%</div>
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-primary">{flagLabels[data.flagType]}</span>{' '}
          {flagDescriptions[data.flagType]}.
        </p>
      </div>
      <div className="text-xs text-text-secondary pt-3 border-t border-border">
        Change vs baseline · View details →
      </div>
    </div>
  );
}

