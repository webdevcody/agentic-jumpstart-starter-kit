# PRP: Playlists Feature

## Priority: 10 (Medium)

## Overview
Allow users to create and manage video playlists.

## Requirements

### Functional Requirements
- Create/edit/delete playlists
- Add/remove videos from playlists
- Reorder videos in playlist
- Public/private visibility
- Playlist sharing
- Auto-play next video
- Save to library

### Non-Functional Requirements
- Handle large playlists (1000+ videos)
- Fast playlist operations
- Collaborative playlists (future)

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
playlists: {
  id: uuid
  userId: uuid (FK to users)
  title: string
  description: text
  thumbnailUrl: string
  visibility: enum('public', 'private', 'unlisted')
  createdAt: timestamp
  updatedAt: timestamp
}

playlistVideos: {
  id: uuid
  playlistId: uuid (FK to playlists)
  videoId: uuid (FK to videos)
  position: integer
  addedAt: timestamp
  addedBy: uuid (FK to users)
  UNIQUE (playlistId, videoId)
}
```

### Components
- `PlaylistCard.tsx` - Playlist preview card
- `PlaylistPlayer.tsx` - Playlist with player
- `PlaylistManager.tsx` - Add/remove videos
- `PlaylistReorder.tsx` - Drag to reorder

### Server Functions
- `createPlaylist()` - Create new playlist
- `updatePlaylist()` - Edit playlist
- `deletePlaylist()` - Remove playlist
- `addToPlaylist()` - Add video
- `removeFromPlaylist()` - Remove video
- `reorderPlaylist()` - Update positions

### Features
- Drag and drop reordering
- Bulk operations
- Import from URL
- Share via link
- Embed player

### API Endpoints
- `POST /api/playlists` - Create playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist
- `POST /api/playlists/:id/videos` - Add video
- `DELETE /api/playlists/:id/videos/:videoId` - Remove
- `PUT /api/playlists/:id/reorder` - Reorder

## Dependencies
- `@dnd-kit/sortable` for drag-and-drop
- Use existing React Query setup