# PRP: Analytics Dashboard

## Priority: 14 (Low)

## Overview
Comprehensive analytics for content creators.

## Requirements

### Functional Requirements
- View counts and trends
- Watch time metrics
- Audience demographics
- Traffic sources
- Revenue analytics
- Real-time views
- Export reports

### Non-Functional Requirements
- Handle large datasets
- Real-time updates
- Data visualization
- GDPR compliance

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
analytics: {
  id: uuid
  videoId: uuid (FK to videos)
  date: date
  views: integer
  uniqueViews: integer
  watchTime: bigint
  avgWatchDuration: integer
  likes: integer
  dislikes: integer
  comments: integer
  shares: integer
}

audienceDemographics: {
  videoId: uuid (FK to videos)
  country: string
  ageRange: string
  gender: string
  viewCount: integer
  date: date
}
```

### Components
- `AnalyticsDashboard.tsx` - Main dashboard
- `MetricCard.tsx` - Stat display
- `ViewsChart.tsx` - Time series chart
- `DemographicsChart.tsx` - Pie/bar charts
- `RevenueReport.tsx` - Earnings display

### Server Functions
- `aggregateAnalytics()` - Daily aggregation job
- `getVideoAnalytics()` - Video stats
- `getChannelAnalytics()` - Channel overview
- `exportAnalytics()` - Generate CSV/PDF

### Data Pipeline
- Collect raw events
- Aggregate hourly/daily
- Calculate derived metrics
- Cache computed results

### API Endpoints
- `GET /api/analytics/video/:id` - Video analytics
- `GET /api/analytics/channel` - Channel analytics
- `GET /api/analytics/realtime/:id` - Live stats
- `GET /api/analytics/export` - Export data

## Dependencies
- `recharts` or `visx` for charts
- `date-fns` for date handling
- `papa-parse` for CSV export