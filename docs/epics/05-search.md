# PRP: Search Feature

## Priority: 5 (High)

## Overview
Implement full-text search across videos, channels, and playlists.

## Requirements

### Functional Requirements
- Search by title, description, tags
- Search filters (upload date, duration, type)
- Search suggestions/autocomplete
- Search history
- Recent searches
- Advanced search options

### Non-Functional Requirements
- Fast search results (<200ms)
- Typo tolerance
- Relevance ranking
- Search analytics

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
videoTags: {
  id: uuid
  videoId: uuid (FK to videos)
  tag: string
}

searchHistory: {
  id: uuid
  userId: uuid (FK to users)
  query: string
  searchedAt: timestamp
}
```

### Components
- `SearchBar.tsx` - Main search input
- `SearchSuggestions.tsx` - Dropdown suggestions
- `SearchResults.tsx` - Results page
- `SearchFilters.tsx` - Filter sidebar

### Server Functions
- `searchVideos()` - Full-text search
- `getSuggestions()` - Autocomplete
- `saveSearchHistory()` - Track searches
- `getPopularSearches()` - Trending searches

### Search Implementation
- PostgreSQL full-text search with GIN indexes
- Or integrate Typesense/Meilisearch for better performance
- Weighted search across title, description, tags
- Implement search scoring algorithm

### API Endpoints
- `GET /api/search` - Main search endpoint
- `GET /api/search/suggestions` - Autocomplete
- `GET /api/search/history` - User's history
- `DELETE /api/search/history` - Clear history

## Dependencies
- PostgreSQL ts_vector for full-text search
- Optional: `typesense` or `meilisearch` client