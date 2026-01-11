import { WorstPeriodData } from '@/types';

interface WorstPeriodCardProps {
  data: WorstPeriodData;
}

export default function WorstPeriodCard({ data }: WorstPeriodCardProps) {
  return (
    <div className="bg-surface border border-border p-5 flex flex-col">
      <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">WORST PERFORMANCE WINDOW</div>
      <div className="flex-1 mb-4">
        <div className="text-2xl font-bold text-negative mb-2">{data.lossShare}%</div>
        <p className="text-sm text-text-secondary leading-relaxed">
          Most losses occur <span className="font-semibold text-text-primary">{data.dayRange}</span>,{' '}
          <span className="font-semibold text-text-primary">{data.hourRange}</span>.
        </p>
      </div>
      <div className="text-xs text-text-secondary pt-3 border-t border-border">
        Loss share · View details →
      </div>
    </div>
  );
}

