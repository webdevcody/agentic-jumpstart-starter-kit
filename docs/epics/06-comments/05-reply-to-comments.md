# User Story: Reply to Comments (Threaded/Nested)

## Priority: 5 (High - Community Engagement)

## Story
As a **logged-in user**, I want to **reply to other users' comments** so that I can **have conversations and discussions about specific points**.

## Acceptance Criteria
- [ ] Each comment displays a "Reply" button
- [ ] Clicking "Reply" opens an inline reply form below the comment
- [ ] Reply form shows indented below the parent comment
- [ ] Replies are visually nested/indented under parent comments
- [ ] Users can reply to both top-level comments and existing replies
- [ ] Maximum nesting depth of 2 levels (replies to replies show at same level)
- [ ] Reply count is shown on parent comments
- [ ] "Show/Hide replies" toggle for comments with replies
- [ ] Reply form can be cancelled, hiding the form
- [ ] After successful reply, it appears immediately under the parent
- [ ] Reply notifications show "@username" of parent comment author

## Technical Details

### Database Updates
```typescript
// Already included in schema from story 01:
// parentId: uuid("parent_id").references(() => comments.id)

// Add index for performance:
export const commentIndexes = {
  parentIdIdx: index("comment_parent_id_idx").on(comments.parentId),
  videoIdIdx: index("comment_video_id_idx").on(comments.videoId)
}
```

### Server Function Updates
```typescript
// src/fn/comments.ts
export const addReplyFn = createServerFn()
  .middleware([requireAuth])
  .validator(z.object({
    parentId: z.string().uuid(),
    videoId: z.string().uuid(),
    content: z.string().min(1).max(5000)
  }))
  .handler(async ({ data, context }) => {
    // Verify parent comment exists
    // Check nesting depth (max 2 levels)
    // If replying to a reply, use its parentId instead
    // Create reply with parentId
    // Return new reply with user info
  })

// Update getCommentsFn to include replies:
export const getCommentsWithRepliesFn = createServerFn()
  .validator(z.object({
    videoId: z.string().uuid(),
    includeReplies: z.boolean().default(true)
  }))
  .handler(async ({ data }) => {
    // Fetch top-level comments (parentId = null)
    // Fetch replies for each comment
    // Structure as nested data
    // Include reply counts
  })
```

### Component Structure
```typescript
// src/components/comments/CommentThread.tsx
export function CommentThread({ 
  comment,
  depth = 0,
  maxDepth = 2 
}) {
  const [showReplies, setShowReplies] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  
  return (
    <div className={`ml-${depth > 0 ? '8' : '0'}`}>
      <CommentItem comment={comment} />
      {comment.replyCount > 0 && (
        <button onClick={() => setShowReplies(!showReplies)}>
          {showReplies ? 'Hide' : 'Show'} {comment.replyCount} replies
        </button>
      )}
      {showReplyForm && (
        <CommentReplyForm 
          parentId={comment.id}
          onCancel={() => setShowReplyForm(false)}
          onSuccess={(reply) => {
            // Add reply to thread
            setShowReplyForm(false)
          }}
        />
      )}
      {showReplies && comment.replies?.map(reply => (
        <CommentThread 
          key={reply.id}
          comment={reply}
          depth={depth < maxDepth ? depth + 1 : depth}
          maxDepth={maxDepth}
        />
      ))}
    </div>
  )
}

// src/components/comments/CommentReplyForm.tsx
- Similar to CommentForm but smaller
- Shows "@username" being replied to
- Cancel button
- Indented positioning
```

### Data Structure
```typescript
interface CommentWithReplies {
  id: string
  content: string
  user: User
  createdAt: Date
  likeCount: number
  dislikeCount: number
  replyCount: number
  parentId: string | null
  replies?: CommentWithReplies[]
  userReaction?: boolean | null
}
```

## Dependencies
- Post comments functionality
- Display comments functionality
- Comment database schema with parentId

## Out of Scope
- Real-time reply notifications
- Mention/tag system beyond basic @username display
- Collapsible thread branches
- Reply drafts/auto-save
- Rich reply previews