# PRP: Monetization System

## Priority: 16 (Future)

## Overview
Revenue generation through ads and creator support.

## Requirements

### Functional Requirements
- Pre-roll/mid-roll ads
- Creator program enrollment
- Revenue sharing
- Super chat/thanks
- Channel memberships
- Merchandise shelf
- Payment processing
- Tax documentation

### Non-Functional Requirements
- PCI compliance
- Fraud detection
- International payments
- Financial reporting

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
creatorProgram: {
  userId: uuid (FK to users)
  status: enum('pending', 'approved', 'suspended')
  tier: enum('basic', 'partner', 'premium')
  revenueShare: decimal
  joinedAt: timestamp
}

earnings: {
  id: uuid
  userId: uuid (FK to users)
  type: enum('ads', 'membership', 'donation')
  amount: decimal
  currency: string
  period: date
  paidOut: boolean
}

advertisements: {
  id: uuid
  advertiserName: string
  videoUrl: string
  targetingCriteria: jsonb
  budget: decimal
  impressions: integer
  clicks: integer
}
```

### Components
- `AdPlayer.tsx` - Ad playback
- `MonetizationDashboard.tsx` - Earnings view
- `CreatorEnrollment.tsx` - Program signup
- `PayoutSettings.tsx` - Payment config

### Server Functions
- `enrollCreator()` - Join program
- `calculateEarnings()` - Revenue calc
- `processPayouts()` - Monthly payouts
- `serveAd()` - Ad selection

### Payment Integration
- Stripe Connect for payouts
- Ad network integration
- Tax form generation (1099)
- Multi-currency support

### API Endpoints
- `POST /api/monetization/enroll` - Join program
- `GET /api/monetization/earnings` - View earnings
- `POST /api/monetization/payout` - Request payout
- `GET /api/ads/serve` - Get ad for video

## Dependencies
- `stripe` for payments
- Ad network SDK
- `pdf-lib` for tax documents