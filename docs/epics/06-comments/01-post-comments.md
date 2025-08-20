# User Story: Post Comments on Videos

## Priority: 1 (Critical - Foundation)

## Story

As a **logged-in user**, I want to **post comments on videos** so that I can **share my thoughts and engage with the video content**.

## Acceptance Criteria

- [ ] Authenticated users can see a comment input field below the video player
- [ ] Comment form displays user's avatar and name
- [ ] Users can type comments up to 5000 characters
- [ ] Character count is displayed when typing
- [ ] Submit button is always enabled and will show client side validation errors if input is empty
- [ ] After successful submission, comment appears immediately in the comment list
- [ ] New comments show timestamp "just now"
- [ ] Users receive error message if submission fails
- [ ] Form is cleared after successful submission
- [ ] Users must be logged in to see the comment form (show login prompt otherwise)

## Technical Details

### Database Changes

```typescript
// Add to src/db/schema.ts
export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  videoId: uuid("video_id")
    .notNull()
    .references(() => videos.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  parentId: uuid("parent_id").references(() => comments.id),
  content: text("content").notNull(),
  editedAt: timestamp("edited_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

### Server Function

```typescript
// src/fn/comments.ts
export const addCommentFn = createServerFn()
  .middleware([requireAuth])
  .validator(
    z.object({
      videoId: z.string().uuid(),
      content: z.string().min(1).max(5000),
    })
  )
  .handler(async ({ data, context }) => {
    // Validate video exists
    // Create comment
    // Return new comment with user info
  });
```

### Component Structure

```typescript
// src/components/comments/CommentForm.tsx
- Avatar display
- Textarea with character count
- Submit button with loading state
- Error display
```

## Dependencies

- User authentication system must be implemented
- Video display page must exist
- Database connection must be configured

## Out of Scope

- Comment editing
- Comment deletion
- Nested replies
- Rich text formatting
- File attachments
