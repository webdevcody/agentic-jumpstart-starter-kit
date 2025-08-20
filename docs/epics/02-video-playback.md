# PRP: Video Playback Feature

## Priority: 2 (Critical)

## Overview
Stream and play uploaded videos with adaptive quality and player controls.

## Requirements

### Functional Requirements
- Play/pause/seek controls
- Volume control with mute
- Fullscreen mode
- Quality selection (auto, 360p, 720p, 1080p)
- Playback speed control
- Keyboard shortcuts
- Resume from last position
- Buffering indicator

### Non-Functional Requirements
- Adaptive bitrate streaming
- Low latency startup
- Mobile responsive
- Bandwidth optimization

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
videoViews: {
  id: uuid
  videoId: uuid (FK to videos)
  userId: uuid (FK to users, nullable)
  watchedAt: timestamp
  watchDuration: integer
  lastPosition: integer
  ipAddress: string
}
```

### Components
- `VideoPlayer.tsx` - Main player wrapper
- `VideoControls.tsx` - Control overlay
- `QualitySelector.tsx` - Resolution picker
- `ProgressBar.tsx` - Seek bar with preview

### Server Functions
- `getVideoStream()` - Stream video chunks
- `trackView()` - Record view analytics
- `savePlaybackPosition()` - Store resume point

### Streaming Strategy
- HLS (HTTP Live Streaming) for adaptive streaming
- Generate multiple quality variants
- CDN delivery with edge caching
- Signed URLs with expiration

### API Endpoints
- `GET /api/videos/:id/stream` - Get HLS manifest
- `GET /api/videos/:id/stream/:quality/:segment` - Get video segment
- `POST /api/videos/:id/view` - Track view
- `POST /api/videos/:id/position` - Save position

## Dependencies
- `video.js` or `plyr` for video player
- `hls.js` for HLS playback
- `@tanstack/react-query` for data fetching