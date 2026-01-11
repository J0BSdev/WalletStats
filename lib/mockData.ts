import { WalletAnalysisData } from '@/types';

export const mockWalletData: WalletAnalysisData = {
  realityCheck: {
    baselineReturn30d: 12.5,
    actualReturn30d: -8.3,
  },
  bestPeriod: {
    window: '3–7 days',
    roiLift: 15.2,
  },
  worstPeriod: {
    dayRange: 'Tue–Thu',
    hourRange: '14:00–18:00',
    lossShare: 68,
  },
  behaviorFlag: {
    flagType: 'overtrading',
    changePercent: 38,
  },
  whyYouLose: {
    dominantCause: 'Overtrading after losses',
    evidenceText: 'Overtrading after losses: +38%',
  },
  timeline: [
    {
      type: 'inactive',
      start: Date.now() - 30 * 24 * 60 * 60 * 1000,
      end: Date.now() - 25 * 24 * 60 * 60 * 1000,
      label: 'Inactive period',
      smallChartSeries: [
        { date: Date.now() - 30 * 24 * 60 * 60 * 1000, value: 1000 },
        { date: Date.now() - 25 * 24 * 60 * 60 * 1000, value: 1125 },
      ],
      explanation: 'During this 5-day inactive period, your portfolio gained 12.5% without any trading activity.',
    },
    {
      type: 'trading',
      start: Date.now() - 25 * 24 * 60 * 60 * 1000,
      end: Date.now() - 20 * 24 * 60 * 60 * 1000,
      label: 'Trading period',
      smallChartSeries: [
        { date: Date.now() - 25 * 24 * 60 * 60 * 1000, value: 1125 },
        { date: Date.now() - 24 * 24 * 60 * 60 * 1000, value: 1100 },
        { date: Date.now() - 23 * 24 * 60 * 60 * 1000, value: 1080 },
        { date: Date.now() - 22 * 24 * 60 * 60 * 1000, value: 1095 },
        { date: Date.now() - 20 * 24 * 60 * 60 * 1000, value: 1075 },
      ],
      explanation: 'Active trading during this period resulted in a net loss of 4.4% compared to the inactive baseline.',
    },
    {
      type: 'loss_cluster',
      start: Date.now() - 15 * 24 * 60 * 60 * 1000,
      end: Date.now() - 12 * 24 * 60 * 60 * 1000,
      label: 'Loss cluster',
      smallChartSeries: [
        { date: Date.now() - 15 * 24 * 60 * 60 * 1000, value: 1075 },
        { date: Date.now() - 14 * 24 * 60 * 60 * 1000, value: 1020 },
        { date: Date.now() - 13 * 24 * 60 * 60 * 1000, value: 980 },
        { date: Date.now() - 12 * 24 * 60 * 60 * 1000, value: 965 },
      ],
      explanation: '68% of your losses occurred during Tue–Thu, 14:00–18:00, indicating a pattern in timing-based decision making.',
    },
  ],
  dailySnapshot: {
    sentence: 'No action is statistically your best action today.',
  },
  weeklyInsight: {
    sentence: 'Your best performance comes after 3–7 days of inactivity, with a 15.2% ROI lift.',
    smallChartSeries: [
      { date: Date.now() - 7 * 24 * 60 * 60 * 1000, value: 950 },
      { date: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 960 },
      { date: Date.now() - 5 * 24 * 60 * 60 * 1000, value: 975 },
      { date: Date.now() - 4 * 24 * 60 * 60 * 1000, value: 990 },
      { date: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 1005 },
      { date: Date.now() - 2 * 24 * 60 * 60 * 1000, value: 1020 },
      { date: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 1040 },
      { date: Date.now(), value: 1055 },
    ],
  },
  performance: {
    equityCurve: [
      { date: Date.now() - 30 * 24 * 60 * 60 * 1000, value: 1000 },
      { date: Date.now() - 25 * 24 * 60 * 60 * 1000, value: 1125 },
      { date: Date.now() - 20 * 24 * 60 * 60 * 1000, value: 1075 },
      { date: Date.now() - 15 * 24 * 60 * 60 * 1000, value: 1020 },
      { date: Date.now() - 12 * 24 * 60 * 60 * 1000, value: 965 },
      { date: Date.now() - 7 * 24 * 60 * 60 * 1000, value: 980 },
      { date: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 1005 },
      { date: Date.now(), value: 917 },
    ],
    drawdown: [
      { date: Date.now() - 30 * 24 * 60 * 60 * 1000, value: 0 },
      { date: Date.now() - 25 * 24 * 60 * 60 * 1000, value: 0 },
      { date: Date.now() - 20 * 24 * 60 * 60 * 1000, value: -4.4 },
      { date: Date.now() - 15 * 24 * 60 * 60 * 1000, value: -9.3 },
      { date: Date.now() - 12 * 24 * 60 * 60 * 1000, value: -14.2 },
      { date: Date.now() - 7 * 24 * 60 * 60 * 1000, value: -12.5 },
      { date: Date.now() - 3 * 24 * 60 * 60 * 1000, value: -10.7 },
      { date: Date.now(), value: -8.3 },
    ],
  },
  behavior: {
    tradesByDayHour: [
      { day: 1, hour: 14, count: 5, roi: -2.1 },
      { day: 1, hour: 15, count: 3, roi: -1.5 },
      { day: 2, hour: 14, count: 8, roi: -3.2 },
      { day: 2, hour: 15, count: 6, roi: -2.8 },
      { day: 3, hour: 14, count: 7, roi: -2.9 },
      { day: 3, hour: 15, count: 4, roi: -1.8 },
      { day: 5, hour: 10, count: 2, roi: 0.8 },
      { day: 6, hour: 11, count: 1, roi: 0.5 },
    ],
    inactivityVsROI: [
      { daysInactive: 0, roi: -2.1 },
      { daysInactive: 1, roi: -1.2 },
      { daysInactive: 2, roi: 0.5 },
      { daysInactive: 3, roi: 3.2 },
      { daysInactive: 4, roi: 5.8 },
      { daysInactive: 5, roi: 8.1 },
      { daysInactive: 6, roi: 10.5 },
      { daysInactive: 7, roi: 12.5 },
      { daysInactive: 10, roi: 15.2 },
    ],
  },
};

