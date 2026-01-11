import { RealityCheckData } from '@/types';

interface RealityCheckHeroProps {
  data: RealityCheckData;
}

export default function RealityCheckHero({ data }: RealityCheckHeroProps) {
  const { baselineReturn30d, actualReturn30d } = data;
  const difference = actualReturn30d - baselineReturn30d;

  return (
    <div className="w-full border-b border-border mb-6 pb-6">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-text-secondary mb-1">REALITY CHECK</div>
      </div>
      
      <div className="space-y-5">
        <div className="flex items-baseline justify-between pb-5 border-b border-border">
          <span className="text-text-secondary">If you did nothing last 30 days:</span>
          <span className={`text-3xl font-bold ${baselineReturn30d >= 0 ? 'text-text-primary' : 'text-negative'}`}>
            {baselineReturn30d >= 0 ? '+' : ''}{baselineReturn30d.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-baseline justify-between">
          <span className="text-text-secondary">Your actual result:</span>
          <span className={`text-3xl font-bold ${actualReturn30d >= 0 ? 'text-text-primary' : 'text-negative'}`}>
            {actualReturn30d >= 0 ? '+' : ''}{actualReturn30d.toFixed(1)}%
          </span>
        </div>
        
        {difference !== 0 && (
          <div className="pt-4 border-t border-border mt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-text-secondary">Difference:</span>
              <span className={`text-xl font-semibold ${difference >= 0 ? 'text-text-primary' : 'text-negative'}`}>
                {difference >= 0 ? '+' : ''}{difference.toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-text-secondary">
        Based on 142 transactions · Last 30 days
      </div>
    </div>
  );
}

