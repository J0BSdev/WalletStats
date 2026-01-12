# WalletStats Live Mode Implementation

## Overview
This document describes the implementation of live mode with deterministic data fetching, strict demo/live separation, and URL-based address state management.

## Routing Structure

- `/` - Landing/Connect page
- `/app/loading?address=0x...` - Loading screen with analysis fetch
- `/app/dashboard?address=0x...` - Dashboard (requires address param, live data)
- `/app/demo` - Demo mode (mock data only)
- `/app/stats?address=0x...` - Stats page (requires address param)
- `/app/timeline?address=0x...` - Timeline page (requires address param)
- `/app/settings` - Settings (no address required)
- `/app/api/analyze?address=0x...` - API route for analysis

## State Management

**Source of Truth**: URL query param `?address=0x...`
**Persistence**: localStorage `walletstats:last_address`
**Resolution Order**:
1. URL param (if present)
2. localStorage
3. Connected wallet (from wagmi)

## Key Files

### Utilities
- `lib/address.ts` - Address validation, normalization, storage utilities
- `lib/wagmi-config.tsx` - Wagmi/RainbowKit configuration

### Pages
- `app/page.tsx` - Landing/Connect page
- `app/app/loading/page.tsx` - Loading screen with analysis fetch
- `app/app/dashboard/page.tsx` - Dashboard (live mode)
- `app/app/demo/page.tsx` - Demo mode (mock data)

### API
- `app/api/analyze/route.ts` - Analysis API endpoint with deterministic stub

## Setup Requirements

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variable** (Optional):
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect Project ID
   - If not set, uses 'default' (will show warning)

3. **Get WalletConnect Project ID**:
   - Go to https://cloud.walletconnect.com
   - Create a project
   - Copy the Project ID
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
     ```

## Deterministic Stub

The API route (`/app/api/analyze`) currently uses a deterministic stub based on address hash:
- Same address always produces same numbers
- Uses FNV hash algorithm
- Clearly marked with `isStub: true` in coverage
- Replace with real backend API call when ready

## Testing Checklist

### Landing Page
- [ ] Can paste wallet address
- [ ] Invalid address shows error "Invalid address"
- [ ] Valid address navigates to `/app/loading?address=0x...`
- [ ] WalletConnect button works (requires project ID)
- [ ] MetaMask connection works
- [ ] Connected wallet redirects to loading page
- [ ] Demo link works

### Loading Page
- [ ] Shows sequential messages
- [ ] Fetches analysis from API
- [ ] Navigates to dashboard on success
- [ ] Shows error + Retry on failure
- [ ] Retry button works

### Dashboard (Live Mode)
- [ ] Requires address param
- [ ] Redirects to `/` if no address
- [ ] Shows address on screen
- [ ] Loads data from API (not mock)
- [ ] Shows error + Retry on API failure
- [ ] Never shows demo/mock data
- [ ] Navigation links include address param

### Demo Mode
- [ ] Uses mock data only
- [ ] No API calls
- [ ] Link to analyze real wallet works

### Stats/Timeline Pages
- [ ] Require address param
- [ ] Show address on screen
- [ ] Load data for that address
- [ ] Navigation preserves address

### API Route
- [ ] Accepts address param
- [ ] Validates address format
- [ ] Returns deterministic data
- [ ] Same address = same numbers
- [ ] Returns 400 for invalid address
- [ ] Returns 500 on error

### Address Utilities
- [ ] `isAddress()` validates correctly
- [ ] `normalizeAddress()` checksums correctly
- [ ] `saveAddress()` saves to localStorage
- [ ] `loadAddress()` loads from localStorage
- [ ] `getAddressFromURL()` reads from URL
- [ ] `hashAddress()` is deterministic

### State Management
- [ ] URL param is source of truth
- [ ] Address persists to localStorage
- [ ] Address resolution follows order (URL → localStorage → wallet)
- [ ] No silent address switching

## Notes

- All wallet connections are read-only
- No transactions are initiated
- All analysis is personal to the selected address
- Demo and live modes are strictly separated
- Error handling shows errors, never falls back to demo

