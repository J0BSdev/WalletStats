'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Settings {
  timezone: string;
  baseCurrency: string;
  hideBalances: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    baseCurrency: 'USD',
    hideBalances: false,
  });
  const router = useRouter();

  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    if (!walletAddress) {
      router.push('/');
      return;
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [router]);

  const handleSettingChange = (key: keyof Settings, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'BTC', 'ETH'];

  return (
    <div className="min-h-screen bg-bg px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Settings</h1>
          <div className="text-xs text-text-secondary mt-1">Application preferences</div>
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
            href="/timeline"
            className="px-3 py-1.5 text-xs border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Timeline
          </Link>
        </div>
      </div>

      <div className="bg-surface border border-border p-5 space-y-6">
        <div>
          <label htmlFor="timezone" className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
            TIMEZONE
          </label>
          <select
            id="timezone"
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-border bg-bg text-text-primary text-sm focus:outline-none focus:border-accent"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currency" className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
            BASE CURRENCY
          </label>
          <select
            id="currency"
            value={settings.baseCurrency}
            onChange={(e) => handleSettingChange('baseCurrency', e.target.value)}
            className="w-full px-3 py-2 border border-border bg-bg text-text-primary text-sm focus:outline-none focus:border-accent"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <label htmlFor="hideBalances" className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
              HIDE BALANCES
            </label>
            <p className="text-xs text-text-secondary mt-1">
              Hide all balance amounts throughout the app
            </p>
          </div>
          <input
            type="checkbox"
            id="hideBalances"
            checked={settings.hideBalances}
            onChange={(e) => handleSettingChange('hideBalances', e.target.checked)}
            className="w-4 h-4 text-accent border-border bg-bg focus:ring-accent focus:ring-1"
          />
        </div>
      </div>
    </div>
  );
}

