# User Story: Like and Dislike Comments

## Priority: 3 (High - Engagement Feature)

## Story
As a **logged-in user**, I want to **like or dislike comments** so that I can **express my agreement or disagreement with other users' opinions**.

## Acceptance Criteria
- [ ] Each comment displays like and dislike buttons
- [ ] Like/dislike counts are shown next to the buttons
- [ ] Authenticated users can click to like or dislike
- [ ] Users can only have one reaction per comment (like OR dislike, not both)
- [ ] Clicking the same reaction again removes it (toggle behavior)
- [ ] Clicking the opposite reaction switches the vote
- [ ] UI updates optimistically (immediate feedback)
- [ ] Reactions persist across page refreshes
- [ ] Non-authenticated users see buttons but get login prompt on click
- [ ] User's own reaction is visually highlighted (filled icon, color change)

## Technical Details

### Database Changes
```typescript
// Add to src/db/schema.ts
export const commentLikes = pgTable("comment_likes", {
  commentId: uuid("comment_id").notNull().references(() => comments.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  isLike: boolean("is_like").notNull(), // true = like, false = dislike
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.commentId, table.userId] })
}))
```

### Server Functions
```typescript
// src/fn/comments.ts
export const likeCommentFn = createServerFn()
  .middleware([requireAuth])
  .validator(z.object({
    commentId: z.string().uuid(),
    isLike: z.boolean() // true = like, false = dislike
  }))
  .handler(async ({ data, context }) => {
    // Check if reaction exists
    // If exists and same type, remove it
    // If exists and different type, update it
    // If doesn't exist, create it
    // Return updated counts
  })

export const removeCommentReactionFn = createServerFn()
  .middleware([requireAuth])
  .validator(z.object({
    commentId: z.string().uuid()
  }))
  .handler(async ({ data, context }) => {
    // Remove user's reaction
    // Return updated counts
  })
```

### Component Updates
```typescript
// src/components/comments/CommentActions.tsx
- Like button with count
- Dislike button with count
- Loading states
- Optimistic updates
- Authentication check

// Update CommentItem.tsx to include:
- Like/dislike counts from database
- User's current reaction state
- CommentActions component
```

### Query Updates
```typescript
// Update getVideoComments to include:
- Like count aggregation
- Dislike count aggregation
- Current user's reaction (if authenticated)
```

## Dependencies
- Comments display story must be completed
- User authentication for reactions
- Comment database schema in place

## Out of Scope
- Reaction animations
- Reaction history/analytics
- Bulk reaction management
- Reaction notifications