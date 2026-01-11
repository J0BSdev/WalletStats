import { DailySnapshotData } from '@/types';

interface DailySnapshotProps {
  data: DailySnapshotData;
}

export default function DailySnapshot({ data }: DailySnapshotProps) {
  return (
    <div className="w-full bg-surface border border-border p-5 mb-4">
      <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">DAILY SNAPSHOT</div>
      <p className="text-text-primary leading-relaxed">{data.sentence}</p>
    </div>
  );
}

