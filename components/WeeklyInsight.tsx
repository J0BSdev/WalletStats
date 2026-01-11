'use client';

import { WeeklyInsightData } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyInsightProps {
  data: WeeklyInsightData;
}

export default function WeeklyInsight({ data }: WeeklyInsightProps) {
  const chartData = data.smallChartSeries.map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: point.value,
  }));

  return (
    <div className="w-full bg-surface border border-border p-5 mb-6">
      <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">WEEKLY INSIGHT</div>
      <p className="text-text-primary mb-4 text-sm leading-relaxed">{data.sentence}</p>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              axisLine={{ stroke: '#1F2937' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              axisLine={{ stroke: '#1F2937' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#111827', 
                border: '1px solid #1F2937',
                borderRadius: '4px',
                color: '#E5E7EB'
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

