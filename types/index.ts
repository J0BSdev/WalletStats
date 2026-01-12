// Wallet connection types
export type WalletProvider = 'metamask' | 'walletconnect' | 'manual';

export interface WalletState {
  address: string | null;
  provider: WalletProvider | null;
  isConnected: boolean;
}

// RealityCheckHero data
export interface RealityCheckData {
  baselineReturn30d: number; // What return would be if did nothing
  actualReturn30d: number; // Actual return
}

// BestPeriodCard data
export interface BestPeriodData {
  window: string; // e.g., "3–7 days"
  roiLift: number; // Percentage improvement
}

// WorstPeriodCard data
export interface WorstPeriodData {
  dayRange: string; // e.g., "Tue–Thu"
  hourRange: string; // e.g., "14:00–18:00"
  lossShare: number; // Percentage of losses in this period
}

// BehaviorFlagCard data
export interface BehaviorFlagData {
  flagType: 'overtrading' | 'revenge_trading' | 'fomo' | 'panic_selling';
  changePercent: number; // e.g., +38% for overtrading
}

// WhyYouLoseConclusion data
export interface WhyYouLoseData {
  dominantCause: string; // Main reason for losses
  evidenceText: string; // One short numeric evidence
}

// Timeline item data
export interface TimelineItem {
  type: 'inactive' | 'trading' | 'loss_cluster';
  start: number; // Timestamp
  end: number; // Timestamp
  label: string;
  smallChartSeries: Array<{ date: number; value: number }>;
  explanation: string; // 1-2 sentence explanation
}

// Daily snapshot data
export interface DailySnapshotData {
  sentence: string;
}

// Weekly insight data
export interface WeeklyInsightData {
  sentence: string;
  smallChartSeries: Array<{ date: number; value: number }>;
}

// Performance stats
export interface PerformanceStats {
  equityCurve: Array<{ date: number; value: number }>;
  drawdown: Array<{ date: number; value: number }>;
}

// Behavior stats
export interface BehaviorStats {
  tradesByDayHour: Array<{ day: number; hour: number; count: number; roi: number }>;
  inactivityVsROI: Array<{ daysInactive: number; roi: number }>;
}

// Settings
export interface Settings {
  timezone: string;
  baseCurrency: string;
  hideBalances: boolean;
}

// Complete wallet analysis data
export interface WalletAnalysisData {
  realityCheck: RealityCheckData;
  bestPeriod: BestPeriodData;
  worstPeriod: WorstPeriodData;
  behaviorFlag: BehaviorFlagData;
  whyYouLose: WhyYouLoseData;
  timeline: TimelineItem[];
  dailySnapshot: DailySnapshotData;
  weeklyInsight: WeeklyInsightData;
  performance: PerformanceStats;
  behavior: BehaviorStats;
}

// API Response types
export interface AnalysisCoverage {
  txCount: number;
  firstTx: number; // timestamp
  lastTx: number; // timestamp
  priceCoveragePct: number;
  isStub: boolean; // true if using deterministic stub
}

export interface AnalysisResponse {
  asOf: number; // timestamp
  coverage: AnalysisCoverage;
  data: WalletAnalysisData;
}

