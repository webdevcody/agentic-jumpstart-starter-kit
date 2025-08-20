# User Story: Delete Own Comments

## Priority: 7 (Medium - Content Management)

## Story
As a **logged-in user**, I want to **delete my own comments** so that I can **remove content I no longer want to be visible**.

## Acceptance Criteria
- [ ] "Delete" button appears on user's own comments only
- [ ] Delete button is located in the comment actions area
- [ ] Clicking "Delete" shows a confirmation dialog
- [ ] Confirmation dialog asks "Are you sure you want to delete this comment?"
- [ ] User can cancel or confirm deletion
- [ ] Comments are soft-deleted (marked as deleted, not physically removed)
- [ ] Deleted comments show as "[Comment deleted]" with original timestamp
- [ ] User info is removed from deleted comments display
- [ ] Replies to deleted comments remain visible
- [ ] Deleted comments can't be liked, replied to, or edited
- [ ] Comment count decreases when comments are deleted

## Technical Details

### Database Updates
```typescript
// Add to src/db/schema.ts
export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  videoId: uuid("video_id").notNull().references(() => videos.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  parentId: uuid("parent_id").references(() => comments.id),
  content: text("content").notNull(),
  isDeleted: boolean("is_deleted").notNull().default(false), // Add this field
  deletedAt: timestamp("deleted_at"), // Add this field
  editedAt: timestamp("edited_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
```

### Server Function
```typescript
// src/fn/comments.ts
export const deleteCommentFn = createServerFn()
  .middleware([requireAuth])
  .validator(z.object({
    commentId: z.string().uuid()
  }))
  .handler(async ({ data, context }) => {
    const { commentId } = data
    const userId = context.user.id
    
    // Verify comment exists and belongs to user
    const comment = await validateCommentOwnership(commentId, userId)
    
    // Soft delete: update isDeleted and deletedAt
    await db.update(comments)
      .set({
        isDeleted: true,
        deletedAt: new Date(),
        // Optionally clear content for privacy
        content: "[Comment deleted]"
      })
      .where(eq(comments.id, commentId))
    
    return { success: true }
  })
```

### Component Updates
```typescript
// src/components/comments/CommentItem.tsx
export function CommentItem({ comment, currentUserId }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const isOwner = currentUserId === comment.userId
  const isDeleted = comment.isDeleted
  
  if (isDeleted) {
    return (
      <div className="text-gray-400 italic">
        <div>[Comment deleted]</div>
        <div className="text-xs">
          {formatRelativeTime(comment.createdAt)}
        </div>
      </div>
    )
  }
  
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteCommentFn({ commentId: comment.id })
      // Comment will be updated via optimistic update or refetch
    } catch (error) {
      console.error('Failed to delete comment:', error)
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }
  
  return (
    <div>
      <div>{comment.content}</div>
      <div className="comment-actions">
        {isOwner && !isDeleted && (
          <>
            <button onClick={() => setShowDeleteDialog(true)}>
              Delete
            </button>
            {showDeleteDialog && (
              <DeleteConfirmDialog
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteDialog(false)}
                isLoading={isDeleting}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

// src/components/comments/DeleteConfirmDialog.tsx
export function DeleteConfirmDialog({ 
  onConfirm, 
  onCancel, 
  isLoading 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Delete Comment</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this comment? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Query Updates
```typescript
// Update getVideoComments to handle deleted comments:
export async function getVideoComments(videoId: string, options: {
  limit?: number
  cursor?: string
  sortBy?: 'newest' | 'top' | 'replies'
  includeDeleted?: boolean // For admin purposes
}) {
  const { includeDeleted = false } = options
  
  const whereConditions = [
    eq(comments.videoId, videoId),
    ...(!includeDeleted ? [eq(comments.isDeleted, false)] : [])
  ]
  
  // Rest of the query logic...
  // Note: Deleted comments still need to be included in threads
  // to maintain reply structure, but shown as "[Comment deleted]"
}
```

## Dependencies
- Comment display functionality
- User authentication for ownership validation
- Edit comment functionality (shares ownership validation)

## Out of Scope
- Hard deletion (permanent removal from database)
- Bulk comment deletion
- Admin/moderator deletion of other users' comments
- Deletion history/audit log
- Undelete functionality
- Cascading deletion of replies