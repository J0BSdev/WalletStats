import { BestPeriodData } from '@/types';

interface BestPeriodCardProps {
  data: BestPeriodData;
}

export default function BestPeriodCard({ data }: BestPeriodCardProps) {
  return (
    <div className="bg-surface border border-border p-5 flex flex-col">
      <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">BEST PERFORMANCE WINDOW</div>
      <div className="flex-1 mb-4">
        <div className="text-2xl font-bold text-text-primary mb-2">+{data.roiLift.toFixed(1)}%</div>
        <p className="text-sm text-text-secondary leading-relaxed">
          You perform best after <span className="font-semibold text-text-primary">{data.window}</span> of inactivity.
        </p>
      </div>
      <div className="text-xs text-text-secondary pt-3 border-t border-border">
        ROI improvement · View details →
      </div>
    </div>
  );
}

