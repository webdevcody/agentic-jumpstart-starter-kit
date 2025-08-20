# PRP: Comments System

## Priority: 6 (High)

## Overview

Implement threaded comment system for video discussions.

## Requirements

### Functional Requirements

- Post comments on videos
- Reply to comments (nested/threaded)
- Edit own comments
- Delete own comments
- Like/dislike comments
- Sort comments (top, newest, replies)
- Load more pagination

### Non-Functional Requirements

- Spam protection
- Content moderation (remove bad words)
- Rate limiting

## Technical Implementation

### Database Schema

```typescript
// Add to src/db/schema.ts
comments: {
  id: uuid
  videoId: uuid (FK to videos)
  userId: uuid (FK to users)
  parentId: uuid (FK to comments, nullable)
  content: text
  editedAt: timestamp (nullable)
  createdAt: timestamp
}

commentLikes: {
  commentId: uuid (FK to comments)
  userId: uuid (FK to users)
  isLike: boolean
  createdAt: timestamp
  PRIMARY KEY (commentId, userId)
}
```

### Components

- `CommentSection.tsx` - Main comments container
- `CommentForm.tsx` - Add comment form
- `CommentThread.tsx` - Nested comment display
- `CommentItem.tsx` - Individual comment

### Server Functions

- `addCommentFn()` - Post new comment
- `editCommentFn()` - Update comment
- `deleteCommentFn()` - Soft delete
- `likeCommentFn()` - Like/dislike
- `getCommentsFn()` - Fetch with pagination
