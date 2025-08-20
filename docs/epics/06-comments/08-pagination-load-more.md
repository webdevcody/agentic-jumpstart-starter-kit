# User Story: Pagination (Load More Comments)

## Priority: 8 (Medium - Performance & UX)

## Story
As a **user**, I want to **load comments incrementally** so that I can **see more discussions without overwhelming the page with too much content at once**.

## Acceptance Criteria
- [ ] Initially load 20 comments per page
- [ ] "Load more comments" button appears at bottom when more comments exist
- [ ] Button shows loading state when fetching additional comments
- [ ] New comments are appended below existing ones
- [ ] Button disappears when all comments are loaded
- [ ] Loading state shows appropriate message ("Loading more comments...")
- [ ] Pagination works with all sort options (newest, top, most replies)
- [ ] Nested replies are included in pagination logic appropriately
- [ ] Scroll position is maintained when loading more
- [ ] Error handling if loading fails with retry option

## Technical Details

### Server Function Updates
```typescript
// Update getCommentsFn in src/fn/comments.ts
export const getCommentsFn = createServerFn()
  .validator(z.object({
    videoId: z.string().uuid(),
    limit: z.number().min(1).max(50).default(20),
    cursor: z.string().optional(), // Use cursor-based pagination
    sortBy: z.enum(['newest', 'top', 'replies']).default('newest')
  }))
  .handler(async ({ data }) => {
    const { videoId, limit, cursor, sortBy } = data
    
    // Build base query with sorting
    let query = db.select({
      id: comments.id,
      content: comments.content,
      userId: comments.userId,
      parentId: comments.parentId,
      createdAt: comments.createdAt,
      editedAt: comments.editedAt,
      isDeleted: comments.isDeleted,
      // Include user info, like counts, etc.
    })
    .from(comments)
    .where(
      and(
        eq(comments.videoId, videoId),
        eq(comments.isDeleted, false),
        isNull(comments.parentId), // Only top-level comments for pagination
        cursor ? lt(comments.createdAt, new Date(cursor)) : undefined
      )
    )
    .orderBy(desc(comments.createdAt))
    .limit(limit + 1) // Fetch one extra to check if more exist
    
    const results = await query
    const hasMore = results.length > limit
    const comments = hasMore ? results.slice(0, -1) : results
    
    // For each comment, fetch its replies
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await getCommentReplies(comment.id)
        return { ...comment, replies, replyCount: replies.length }
      })
    )
    
    return {
      comments: commentsWithReplies,
      hasMore,
      nextCursor: hasMore ? comments[comments.length - 1].createdAt.toISOString() : null
    }
  })
```

### Component Implementation
```typescript
// src/components/comments/CommentSection.tsx
export function CommentSection({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'top' | 'replies'>('newest')
  const [error, setError] = useState<string | null>(null)
  
  // Initial load
  useEffect(() => {
    loadComments(true)
  }, [videoId, sortBy])
  
  const loadComments = async (reset = false) => {
    if (reset) {
      setIsLoading(true)
      setComments([])
      setNextCursor(null)
    } else {
      setIsLoadingMore(true)
    }
    
    setError(null)
    
    try {
      const result = await getCommentsFn({
        videoId,
        sortBy,
        cursor: reset ? undefined : nextCursor
      })
      
      if (reset) {
        setComments(result.comments)
      } else {
        setComments(prev => [...prev, ...result.comments])
      }
      
      setHasMore(result.hasMore)
      setNextCursor(result.nextCursor)
    } catch (err) {
      setError('Failed to load comments. Please try again.')
      console.error('Error loading comments:', err)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }
  
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadComments(false)
    }
  }
  
  const handleRetry = () => {
    setError(null)
    loadComments(false)
  }
  
  if (isLoading) {
    return <CommentsSkeleton />
  }
  
  return (
    <div className="comments-section">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          {comments.length} Comments
        </h3>
        <CommentSort 
          currentSort={sortBy}
          onSortChange={(newSort) => setSortBy(newSort)}
        />
      </div>
      
      <CommentForm videoId={videoId} />
      
      <div className="mt-6 space-y-4">
        {comments.map(comment => (
          <CommentThread 
            key={comment.id} 
            comment={comment}
          />
        ))}
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={handleRetry}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}
      
      {hasMore && !error && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner className="w-4 h-4 mr-2" />
                Loading more comments...
              </span>
            ) : (
              'Load more comments'
            )}
          </button>
        </div>
      )}
      
      {!hasMore && comments.length > 0 && (
        <div className="mt-6 text-center text-gray-500">
          That's all the comments!
        </div>
      )}
    </div>
  )
}

// src/components/comments/CommentsSkeleton.tsx
export function CommentsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Cursor-based Pagination Logic
```typescript
// src/data-access/comments.ts
export async function getCommentReplies(parentId: string) {
  return await db.select({
    id: comments.id,
    content: comments.content,
    userId: comments.userId,
    parentId: comments.parentId,
    createdAt: comments.createdAt,
    editedAt: comments.editedAt,
    isDeleted: comments.isDeleted,
    // Include user info
  })
  .from(comments)
  .where(
    and(
      eq(comments.parentId, parentId),
      eq(comments.isDeleted, false)
    )
  )
  .orderBy(asc(comments.createdAt))
}
```

## Dependencies
- Comments display functionality
- Comment sorting functionality
- Database with proper indexing for pagination performance

## Out of Scope
- Infinite scroll (auto-loading on scroll)
- Virtual scrolling for very large comment lists
- Page-based pagination (numbered pages)
- Pagination for nested replies (all replies load with parent)
- Caching of loaded comments across page navigation