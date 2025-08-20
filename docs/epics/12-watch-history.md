# PRP: Watch History Feature

## Priority: 12 (Low)

## Overview
Track and display user's video watching history.

## Requirements

### Functional Requirements
- Track watched videos
- Resume playback position
- History page with timeline
- Clear history options
- Pause/resume history tracking
- Search within history
- Filter by date range

### Non-Functional Requirements
- Privacy-focused
- Efficient storage
- Fast retrieval

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
watchHistory: {
  id: uuid
  userId: uuid (FK to users)
  videoId: uuid (FK to videos)
  watchedAt: timestamp
  watchDuration: integer
  lastPosition: integer
  completed: boolean
  UNIQUE (userId, videoId, watchedAt::date)
}
```

### Components
- `WatchHistory.tsx` - History page
- `HistoryItem.tsx` - Individual entry
- `HistoryFilters.tsx` - Date/search filters
- `ClearHistoryModal.tsx` - Clear confirmation

### Server Functions
- `addToHistory()` - Track watch
- `updateWatchPosition()` - Save position
- `getWatchHistory()` - Fetch with pagination
- `clearHistory()` - Delete history
- `searchHistory()` - Search in history

### Privacy Features
- Incognito mode (no tracking)
- Selective deletion
- Auto-delete after X days
- Export history

### API Endpoints
- `POST /api/history` - Add to history
- `GET /api/history` - Get history
- `DELETE /api/history` - Clear all
- `DELETE /api/history/:id` - Remove item
- `GET /api/history/export` - Export data

## Dependencies
- Use existing React Query setup
- Consider IndexedDB for offline history