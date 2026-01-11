'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockWalletData } from '@/lib/mockData';
import Link from 'next/link';

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<'performance' | 'behavior'>('performance');
  const router = useRouter();

  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    if (!walletAddress) {
      router.push('/');
    }
  }, [router]);

  const performanceData = mockWalletData.performance.equityCurve.map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    equity: point.value,
  }));

  const drawdownData = mockWalletData.performance.drawdown.map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    drawdown: point.value,
  }));

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const behaviorData = mockWalletData.behavior.tradesByDayHour.map((item) => ({
    label: `${dayLabels[item.day]} ${item.hour}:00`,
    count: item.count,
    roi: item.roi,
  }));

  const inactivityData = mockWalletData.behavior.inactivityVsROI.map((item) => ({
    days: item.daysInactive,
    roi: item.roi,
  }));

  return (
    <div className="min-h-screen bg-bg px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-4 flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Stats</h1>
          <div className="text-xs text-text-secondary mt-1">Performance and behavior metrics</div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/analyze"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Dashboard
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

      <div className="mb-4 border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-2 py-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'performance'
                ? 'border-accent text-text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            PERFORMANCE
          </button>
          <button
            onClick={() => setActiveTab('behavior')}
            className={`px-2 py-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'behavior'
                ? 'border-accent text-text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            BEHAVIOR
          </button>
        </div>
      </div>

      {activeTab === 'performance' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border p-4">
            <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">EQUITY CURVE</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
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
                  <Line type="monotone" dataKey="equity" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-surface border border-border p-4">
            <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">DRAWDOWN</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={drawdownData}>
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
                  <Line type="monotone" dataKey="drawdown" stroke="#EF4444" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'behavior' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border p-4">
            <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">TRADES BY DAY/HOUR</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={behaviorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis 
                    dataKey="label" 
                    stroke="#9CA3AF" 
                    tick={{ fill: '#9CA3AF', fontSize: 9 }}
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
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
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-surface border border-border p-4">
            <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">INACTIVITY VS ROI</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inactivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis 
                    dataKey="days" 
                    stroke="#9CA3AF" 
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    axisLine={{ stroke: '#1F2937' }}
                    label={{ value: 'Days Inactive', position: 'insideBottom', offset: -5, fill: '#9CA3AF', fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    axisLine={{ stroke: '#1F2937' }}
                    label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft', fill: '#9CA3AF', fontSize: 10 }}
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
                  <Line type="monotone" dataKey="roi" stroke="#3B82F6" strokeWidth={1.5} dot={{ r: 3, fill: '#3B82F6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

