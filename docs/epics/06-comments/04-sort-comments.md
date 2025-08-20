# User Story: Sort Comments

## Priority: 4 (High - User Experience)

## Story
As a **user**, I want to **sort comments by different criteria** so that I can **find the most relevant or interesting discussions quickly**.

## Acceptance Criteria
- [ ] Sort dropdown/selector appears above the comments list
- [ ] Available sort options: "Newest first", "Top comments", "Most replies"
- [ ] Default sort is "Newest first"
- [ ] Changing sort option immediately re-fetches and displays comments
- [ ] Current sort selection persists during the session
- [ ] Loading indicator shows while re-sorting
- [ ] Sort preference is maintained when navigating back to the video
- [ ] URL updates with sort parameter for shareable links (optional)
- [ ] Comment count remains visible during sorting

## Technical Details

### Component Updates
```typescript
// src/components/comments/CommentSort.tsx
export function CommentSort({ 
  currentSort: 'newest' | 'top' | 'replies',
  onSortChange: (sort: string) => void 
}) {
  // Dropdown/select component
  // Options: Newest first, Top comments, Most replies
  // Handle selection change
}

// Update CommentSection.tsx
- Add sort state management
- Include CommentSort component
- Pass sort parameter to getCommentsFn
- Handle sort changes with loading state
```

### Server Function Updates
```typescript
// Update getCommentsFn in src/fn/comments.ts
.handler(async ({ data }) => {
  const { videoId, sortBy, limit, cursor } = data
  
  // Build query based on sortBy:
  // 'newest': ORDER BY created_at DESC
  // 'top': ORDER BY (likes - dislikes) DESC, created_at DESC
  // 'replies': ORDER BY reply_count DESC, created_at DESC
  
  // Include reply count subquery
  // Include like/dislike aggregations
  // Apply pagination
})
```

### Data Access Updates
```typescript
// src/data-access/comments.ts
export async function getVideoComments(videoId: string, options: {
  limit?: number
  cursor?: string
  sortBy?: 'newest' | 'top' | 'replies'
}) {
  // Implement different sort queries:
  
  if (sortBy === 'top') {
    // Include like/dislike calculation
    // Order by score (likes - dislikes)
  }
  
  if (sortBy === 'replies') {
    // Include reply count subquery
    // Order by reply count
  }
  
  // Default: order by created_at DESC
}
```

### State Management
```typescript
// Consider using URL params or session storage
// to persist sort preference:

// Option 1: URL params
const [searchParams, setSearchParams] = useSearchParams()
const currentSort = searchParams.get('sort') || 'newest'

// Option 2: Session storage
const [sort, setSort] = useState(() => 
  sessionStorage.getItem('commentSort') || 'newest'
)
```

## Dependencies
- Display comments story completed
- Like/dislike functionality (for "top" sorting)
- Reply functionality (for "replies" sorting) - can be mocked initially

## Out of Scope
- Custom sort options
- Multi-criteria sorting
- Sort direction toggle (asc/desc)
- Saving sort preference to user profile
- Advanced filtering options