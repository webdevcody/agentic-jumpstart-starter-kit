# PRP: Likes & Dislikes System

## Priority: 7 (Medium)

## Overview
Allow users to rate videos with likes and dislikes.

## Requirements

### Functional Requirements
- Like/dislike videos
- Toggle between like/dislike/neutral
- Display like count
- Display like/dislike ratio
- Show user's rating status
- Animate rating changes

### Non-Functional Requirements
- Prevent duplicate ratings
- Fast UI updates
- Anonymous viewing of counts

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
videoRatings: {
  videoId: uuid (FK to videos)
  userId: uuid (FK to users)
  rating: enum('like', 'dislike')
  createdAt: timestamp
  PRIMARY KEY (videoId, userId)
}

// Add to videos table
videos: {
  ...existing
  likeCount: integer (default 0)
  dislikeCount: integer (default 0)
}
```

### Components
- `RatingButtons.tsx` - Like/dislike buttons
- `RatingBar.tsx` - Visual ratio display
- `RatingCount.tsx` - Formatted count display

### Server Functions
- `rateVideo()` - Set/update rating
- `removeRating()` - Remove rating
- `getUserRating()` - Get user's rating
- `updateRatingCounts()` - Update denormalized counts

### Optimization Strategy
- Denormalize counts on videos table
- Update counts via database triggers
- Optimistic UI updates
- Cache user ratings

### API Endpoints
- `POST /api/videos/:id/rate` - Set rating
- `DELETE /api/videos/:id/rate` - Remove rating
- `GET /api/videos/:id/rating` - Get user's rating

## Dependencies
- Use existing React Query setup
- `framer-motion` for animations