# PRP: Video Discovery & Browse

## Priority: 4 (High)

## Overview
Enable users to discover and browse video content through various methods.

## Requirements

### Functional Requirements
- Homepage with trending videos
- Category filtering
- Sort options (newest, popular, most viewed)
- Infinite scroll pagination
- Grid/list view toggle
- Video cards with preview
- Hover to play preview

### Non-Functional Requirements
- Fast page loads
- SEO optimization
- Responsive grid layout
- Lazy loading images

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
categories: {
  id: uuid
  name: string
  slug: string (unique)
  description: text
  icon: string
}

videoCategories: {
  videoId: uuid (FK to videos)
  categoryId: uuid (FK to categories)
}
```

### Components
- `VideoGrid.tsx` - Responsive video grid
- `VideoCard.tsx` - Individual video card
- `CategoryFilter.tsx` - Category selector
- `SortDropdown.tsx` - Sorting options
- `InfiniteScroll.tsx` - Load more on scroll

### Server Functions
- `getTrendingVideos()` - Fetch trending content
- `getVideosByCategory()` - Filter by category
- `getRecentVideos()` - Latest uploads
- `getPopularVideos()` - Most viewed

### Caching Strategy
- Cache trending videos for 1 hour
- Cache category lists
- Use React Query for client caching
- Implement ISR for static pages

### API Endpoints
- `GET /api/videos/trending` - Trending videos
- `GET /api/videos/recent` - Recent uploads
- `GET /api/videos/category/:slug` - By category
- `GET /api/categories` - List categories

## Dependencies
- `@tanstack/react-query` for data fetching
- `react-intersection-observer` for infinite scroll