'use client';

import { TimelineItem } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineItemModalProps {
  item: TimelineItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TimelineItemModal({ item, isOpen, onClose }: TimelineItemModalProps) {
  if (!isOpen || !item) return null;

  const chartData = item.smallChartSeries.map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: point.value,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-surface border border-border p-5 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-wider text-text-secondary mb-1">{item.type.toUpperCase().replace('_', ' ')}</div>
            <h3 className="text-lg font-semibold text-text-primary">{item.label}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF" 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111827', 
                  border: '1px solid #1F2937',
                  borderRadius: '4px',
                  color: '#E5E7EB',
                  fontSize: '11px'
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed">{item.explanation}</p>
      </div>
    </div>
  );
}

