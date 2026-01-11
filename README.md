# WalletStats

Personal wallet performance and behavior insights - a clean, minimal MVP frontend.

## Features

- **Landing Page**: Simple wallet connection interface
- **Reality Check Hero**: Shows baseline vs actual returns (main value)
- **Insight Cards**: Best period, worst period, and behavior patterns
- **Why You Lose Conclusion**: Summarizes dominant cause of losses
- **Stats View**: Performance and behavior charts
- **Timeline View**: Visual timeline of inactive/trading/loss periods
- **Daily Snapshot & Weekly Insight**: Personalized insights
- **Settings**: Timezone, currency, and privacy preferences

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- TailwindCSS
- Recharts (for charts)
- Mobile-first design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
walletstats/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── analyze/           # Main dashboard
│   ├── stats/             # Performance/Behavior stats
│   ├── timeline/          # Timeline view
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── RealityCheckHero.tsx
│   ├── BestPeriodCard.tsx
│   ├── WorstPeriodCard.tsx
│   ├── BehaviorFlagCard.tsx
│   ├── WhyYouLoseConclusion.tsx
│   ├── DailySnapshot.tsx
│   ├── WeeklyInsight.tsx
│   ├── AnalysisLoading.tsx
│   └── TimelineItemModal.tsx
├── types/                 # TypeScript type definitions
│   └── index.ts
├── lib/                   # Utilities and data
│   └── mockData.ts        # Mock data for MVP
└── package.json

```

## Notes

- Currently uses mock data (fully functional with mock data)
- Wallet connection is simulated (no real wallet integration)
- All insights are derived from mock wallet analysis data
- Ready for backend integration when available

## Rules

- Read-only wallet access
- No trading signals or advice
- No market overview
- Everything is personal to the connected wallet
- No social features
