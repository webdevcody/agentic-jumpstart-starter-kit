# PRP: Channel Management

## Priority: 9 (Medium)

## Overview
Customizable channel pages with branding and content organization.

## Requirements

### Functional Requirements
- Channel homepage
- Channel banner upload
- About section
- Featured video
- Video sections (uploads, popular, playlists)
- Channel analytics dashboard
- Channel settings

### Non-Functional Requirements
- SEO-friendly URLs
- Fast channel page loads
- Mobile responsive design

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
channels: {
  id: uuid
  userId: uuid (FK to users)
  bannerUrl: string
  about: text
  featuredVideoId: uuid (FK to videos)
  socialLinks: jsonb
  customUrl: string (unique)
  createdAt: timestamp
}

channelSections: {
  id: uuid
  channelId: uuid (FK to channels)
  title: string
  type: enum('uploads', 'popular', 'playlist')
  playlistId: uuid (nullable)
  position: integer
}
```

### Components
- `ChannelPage.tsx` - Main channel layout
- `ChannelBanner.tsx` - Banner with edit
- `ChannelTabs.tsx` - Navigation tabs
- `ChannelVideos.tsx` - Video grid
- `ChannelAbout.tsx` - About section

### Server Functions
- `getChannel()` - Fetch channel data
- `updateChannel()` - Update settings
- `uploadBanner()` - Handle banner upload
- `getChannelVideos()` - Fetch channel's videos
- `getChannelStats()` - Analytics data

### Analytics Features
- Total views
- Subscriber growth
- Watch time
- Top performing videos
- Traffic sources

### API Endpoints
- `GET /api/channels/:id` - Get channel
- `PUT /api/channels/:id` - Update channel
- `POST /api/channels/:id/banner` - Upload banner
- `GET /api/channels/:id/videos` - Channel videos
- `GET /api/channels/:id/analytics` - Stats

## Dependencies
- `recharts` for analytics charts
- `@uploadthing/react` for banner uploads