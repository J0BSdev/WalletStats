'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockWalletData } from '@/lib/mockData';
import TimelineItemModal from '@/components/TimelineItemModal';
import { TimelineItem } from '@/types';
import Link from 'next/link';

export default function TimelinePage() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    if (!walletAddress) {
      router.push('/');
    }
  }, [router]);

  const timeline = mockWalletData.timeline;

  const handleItemClick = (item: TimelineItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const getTypeColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'inactive':
        return 'bg-surface border-accent';
      case 'trading':
        return 'bg-surface border-accent';
      case 'loss_cluster':
        return 'bg-surface border-negative';
      default:
        return 'bg-surface border-border';
    }
  };

  const getTypeLabel = (type: TimelineItem['type']) => {
    switch (type) {
      case 'inactive':
        return 'Inactive';
      case 'trading':
        return 'Trading';
      case 'loss_cluster':
        return 'Loss Cluster';
      default:
        return '';
    }
  };

  // Calculate timeline positions
  const minDate = Math.min(...timeline.map((item) => item.start));
  const maxDate = Math.max(...timeline.map((item) => item.end));
  const totalDuration = maxDate - minDate;

  return (
    <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-4 flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Timeline</h1>
          <div className="text-xs text-text-secondary mt-1">Activity periods and events</div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/analyze"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/stats"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Stats
          </Link>
          <Link
            href="/settings"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>

      <div className="bg-surface border border-border p-5">
        <div className="text-xs uppercase tracking-wider text-text-secondary mb-4">TIMELINE</div>
        <div className="relative h-24 border-b border-border mb-4">
          {timeline.map((item, index) => {
            const left = ((item.start - minDate) / totalDuration) * 100;
            const width = ((item.end - item.start) / totalDuration) * 100;

            return (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="absolute cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <div className={`${getTypeColor(item.type)} h-8 border flex items-center justify-center px-2`}>
                  <span className="text-text-primary text-xs font-medium text-center truncate">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-surface border border-accent"></div>
            <span>Inactive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-surface border border-accent"></div>
            <span>Trading</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-surface border border-negative"></div>
            <span>Loss Cluster</span>
          </div>
        </div>
      </div>

      <TimelineItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

