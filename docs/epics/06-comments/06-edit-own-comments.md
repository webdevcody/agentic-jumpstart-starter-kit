# User Story: Edit Own Comments

## Priority: 6 (Medium - Quality of Life)

## Story
As a **logged-in user**, I want to **edit my own comments** so that I can **correct mistakes or update my thoughts without deleting and reposting**.

## Acceptance Criteria
- [ ] "Edit" button appears on user's own comments only
- [ ] Edit button is located in the comment actions area
- [ ] Clicking "Edit" replaces comment text with an editable textarea
- [ ] Original comment content pre-fills the edit form
- [ ] Character count is displayed while editing (max 5000)
- [ ] "Save" and "Cancel" buttons replace the Edit button
- [ ] Changes are saved when clicking "Save" or pressing Ctrl+Enter
- [ ] "Cancel" restores original comment content
- [ ] Edited comments show "(edited)" indicator with edit timestamp
- [ ] Users can only edit their own comments
- [ ] Edit history is not preserved (only shows latest version)
- [ ] Comments can be edited multiple times

## Technical Details

### Database Updates
```typescript
// editedAt field already exists in schema from story 01:
// editedAt: timestamp("edited_at")

// No additional schema changes needed
```

### Server Function
```typescript
// src/fn/comments.ts
export const editCommentFn = createServerFn()
  .middleware([requireAuth])
  .validator(z.object({
    commentId: z.string().uuid(),
    content: z.string().min(1).max(5000)
  }))
  .handler(async ({ data, context }) => {
    const { commentId, content } = data
    const userId = context.user.id
    
    // Verify comment exists and belongs to user
    // Update content and editedAt timestamp
    // Return updated comment
  })
```

### Component Updates
```typescript
// src/components/comments/CommentItem.tsx
export function CommentItem({ comment, currentUserId }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  
  const isOwner = currentUserId === comment.userId
  
  if (isEditing) {
    return <CommentEditForm 
      comment={comment}
      onSave={(content) => {
        // Call editCommentFn
        // Update local state
        setIsEditing(false)
      }}
      onCancel={() => {
        setEditContent(comment.content)
        setIsEditing(false)
      }}
    />
  }
  
  return (
    <div>
      <div>{comment.content}</div>
      {comment.editedAt && (
        <span className="text-xs text-gray-500">
          (edited {formatRelativeTime(comment.editedAt)})
        </span>
      )}
      {isOwner && (
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  )
}

// src/components/comments/CommentEditForm.tsx
export function CommentEditForm({ 
  comment, 
  onSave, 
  onCancel 
}) {
  const [content, setContent] = useState(comment.content)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSave = async () => {
    if (content.trim() === comment.content) {
      onCancel()
      return
    }
    
    setIsLoading(true)
    try {
      await onSave(content.trim())
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSave()
    }
    if (e.key === 'Escape') {
      onCancel()
    }
  }
  
  return (
    <div>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={5000}
        className="w-full p-2 border rounded"
        rows={3}
        autoFocus
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">
          {5000 - content.length} characters remaining
        </span>
        <div className="space-x-2">
          <button 
            onClick={onCancel}
            disabled={isLoading}
            className="px-3 py-1 text-gray-600 border rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isLoading || content.trim().length === 0}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Permissions & Validation
```typescript
// Server-side validation:
export async function validateCommentOwnership(
  commentId: string,
  userId: string
) {
  const comment = await db.query.comments.findFirst({
    where: eq(comments.id, commentId)
  })
  
  if (!comment) {
    throw new Error('Comment not found')
  }
  
  if (comment.userId !== userId) {
    throw new Error('Not authorized to edit this comment')
  }
  
  return comment
}
```

## Dependencies
- Comment display functionality
- User authentication for ownership validation
- Comments database with editedAt field

## Out of Scope
- Edit history/version tracking
- Time limit on editing (can edit indefinitely)
- Rich text editing
- Admin/moderator editing of other users' comments
- Edit notifications to other users