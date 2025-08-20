# User Story: Display and Load Comments

## Priority: 2 (Critical - Core Functionality)

## Story
As a **user**, I want to **view comments on videos** so that I can **read community discussions and feedback about the video**.

## Acceptance Criteria
- [ ] Comments section appears below the video player
- [ ] Comments are displayed in a list format
- [ ] Each comment shows: user avatar, username, timestamp, and comment text
- [ ] Comments display relative timestamps (e.g., "2 hours ago", "3 days ago")
- [ ] Total comment count is shown at the top of the section
- [ ] Comments are loaded automatically when viewing a video
- [ ] Loading skeleton is shown while comments are being fetched
- [ ] Empty state message when no comments exist
- [ ] Error state with retry button if loading fails
- [ ] Comments are initially sorted by newest first (default)

## Technical Details

### Server Function
```typescript
// src/fn/comments.ts
export const getCommentsFn = createServerFn()
  .validator(z.object({
    videoId: z.string().uuid(),
    limit: z.number().min(1).max(50).default(20),
    cursor: z.string().optional(),
    sortBy: z.enum(['newest', 'top', 'replies']).default('newest')
  }))
  .handler(async ({ data }) => {
    // Fetch comments with user info
    // Apply sorting
    // Return paginated results
  })
```

### Component Structure
```typescript
// src/components/comments/CommentSection.tsx
- Comment count header
- CommentList component
- Loading skeleton
- Empty state
- Error boundary

// src/components/comments/CommentItem.tsx
- User avatar
- Username and timestamp
- Comment content
- Action buttons placeholder
```

### Data Access Layer
```typescript
// src/data-access/comments.ts
export async function getVideoComments(videoId: string, options: {
  limit?: number
  cursor?: string
  sortBy?: 'newest' | 'top' | 'replies'
}) {
  // Query comments with user joins
  // Apply pagination
  // Return formatted data
}
```

## Dependencies
- Post comments story must be completed (for database schema)
- User system for displaying user info
- Video page to host the comments section

## Out of Scope
- Comment threading/nesting
- Like/dislike counts
- Comment sorting options (UI)
- Infinite scroll pagination
- Real-time updates