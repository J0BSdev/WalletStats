import { NextRequest, NextResponse } from 'next/server';
import { isAddress, normalizeAddress, hashAddress } from '@/lib/address';
import { AnalysisResponse, WalletAnalysisData } from '@/types';

/**
 * Deterministic stub generator based on address hash
 * Same address always produces same numbers
 */
function generateDeterministicStub(address: string): WalletAnalysisData {
  const hash = hashAddress(address);
  
  // Use hash to generate deterministic values (0-1 range)
  const seed1 = ((hash & 0xFFFF) / 0xFFFF);
  const seed2 = (((hash >> 16) & 0xFFFF) / 0xFFFF);
  const seed3 = (((hash >> 8) & 0xFF) / 0xFF);
  const seed4 = (((hash >> 24) & 0xFF) / 0xFF);
  
  // Generate values deterministically
  const baselineReturn = (seed1 * 25 - 12.5).toFixed(1); // -12.5 to 12.5
  const actualReturn = (seed2 * 30 - 20).toFixed(1); // -20 to 10
  const roiLift = (seed3 * 20 + 5).toFixed(1); // 5 to 25
  const lossShare = Math.round(seed4 * 50 + 40); // 40 to 90
  const changePercent = Math.round(seed1 * 50 + 20); // 20 to 70
  
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  
  return {
    realityCheck: {
      baselineReturn30d: parseFloat(baselineReturn),
      actualReturn30d: parseFloat(actualReturn),
    },
    bestPeriod: {
      window: '3–7 days',
      roiLift: parseFloat(roiLift),
    },
    worstPeriod: {
      dayRange: 'Tue–Thu',
      hourRange: '14:00–18:00',
      lossShare: lossShare,
    },
    behaviorFlag: {
      flagType: ['overtrading', 'revenge_trading', 'fomo', 'panic_selling'][Math.round(seed3 * 3)] as any,
      changePercent: changePercent,
    },
    whyYouLose: {
      dominantCause: 'Overtrading after losses',
      evidenceText: `Overtrading after losses: +${changePercent}%`,
    },
    timeline: [],
    dailySnapshot: {
      sentence: 'No action is statistically your best action today.',
    },
    weeklyInsight: {
      sentence: `Your best performance comes after 3–7 days of inactivity, with a ${roiLift}% ROI lift.`,
      smallChartSeries: Array.from({ length: 8 }, (_, i) => ({
        date: now - (7 - i) * 24 * 60 * 60 * 1000,
        value: 950 + (parseFloat(roiLift) * i * 1.5),
      })),
    },
    performance: {
      equityCurve: Array.from({ length: 8 }, (_, i) => ({
        date: thirtyDaysAgo + (i * (30 / 7) * 24 * 60 * 60 * 1000),
        value: 1000 + (parseFloat(actualReturn) * 10 * i / 7),
      })),
      drawdown: Array.from({ length: 8 }, (_, i) => ({
        date: thirtyDaysAgo + (i * (30 / 7) * 24 * 60 * 60 * 1000),
        value: Math.min(0, parseFloat(actualReturn) * -0.5 * (i / 7)),
      })),
    },
    behavior: {
      tradesByDayHour: [],
      inactivityVsROI: [],
    },
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const range = parseInt(searchParams.get('range') || '30');
  const tz = searchParams.get('tz') || 'UTC';

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  if (!isAddress(address)) {
    return NextResponse.json(
      { error: 'Invalid address format' },
      { status: 400 }
    );
  }

  try {
    const normalizedAddress = normalizeAddress(address);
    
    // TODO: Replace with real backend API call
    // For now, use deterministic stub
    const data = generateDeterministicStub(normalizedAddress);
    
    const response: AnalysisResponse = {
      asOf: Date.now(),
      coverage: {
        txCount: 142, // Stub value
        firstTx: Date.now() - 30 * 24 * 60 * 60 * 1000,
        lastTx: Date.now(),
        priceCoveragePct: 85,
        isStub: true, // Mark as stub until real backend is ready
      },
      data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze wallet' },
      { status: 500 }
    );
  }
}

