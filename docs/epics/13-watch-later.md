# PRP: Watch Later Feature

## Priority: 13 (Low)

## Overview
Allow users to save videos for later viewing.

## Requirements

### Functional Requirements
- Add/remove from watch later
- Watch later playlist page
- Quick add button on video cards
- Bulk operations
- Auto-remove after watching
- Sort options (date added, duration)

### Non-Functional Requirements
- Fast add/remove operations
- Sync across devices
- No limit on list size

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
watchLater: {
  id: uuid
  userId: uuid (FK to users)
  videoId: uuid (FK to videos)
  addedAt: timestamp
  watchedAt: timestamp (nullable)
  UNIQUE (userId, videoId)
}
```

### Components
- `WatchLaterButton.tsx` - Add/remove button
- `WatchLaterPage.tsx` - List view
- `WatchLaterCard.tsx` - Video card variant

### Server Functions
- `addToWatchLater()` - Add video
- `removeFromWatchLater()` - Remove video
- `getWatchLater()` - Fetch list
- `isInWatchLater()` - Check status

### Features
- One-click add from any video
- Keyboard shortcut (W key)
- Toast notifications
- Progress tracking

### API Endpoints
- `POST /api/watch-later` - Add video
- `DELETE /api/watch-later/:videoId` - Remove
- `GET /api/watch-later` - Get list
- `GET /api/watch-later/check/:videoId` - Check status

## Dependencies
- Use existing React Query setup
- `sonner` for toast notifications