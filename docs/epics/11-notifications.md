# PRP: Notifications System

## Priority: 11 (Low)

## Overview
Real-time notifications for user activities and updates.

## Requirements

### Functional Requirements
- New video from subscription
- Comment replies
- Video likes
- New subscribers
- Video processing status
- System announcements
- Mark as read/unread
- Notification preferences

### Non-Functional Requirements
- Real-time delivery
- Scalable to millions of users
- Delivery guarantees
- Multi-channel (in-app, email, push)

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
notifications: {
  id: uuid
  userId: uuid (FK to users)
  type: enum('video', 'comment', 'like', 'subscriber', 'system')
  title: string
  message: text
  data: jsonb
  readAt: timestamp (nullable)
  createdAt: timestamp
}

notificationPreferences: {
  userId: uuid (FK to users)
  emailEnabled: boolean
  pushEnabled: boolean
  videoUploads: boolean
  comments: boolean
  likes: boolean
  subscribers: boolean
}
```

### Components
- `NotificationBell.tsx` - Header notification icon
- `NotificationDropdown.tsx` - Notification list
- `NotificationItem.tsx` - Individual notification
- `NotificationSettings.tsx` - Preferences page

### Server Functions
- `createNotification()` - Send notification
- `markAsRead()` - Mark read
- `markAllAsRead()` - Bulk mark
- `getNotifications()` - Fetch with pagination
- `updatePreferences()` - Update settings

### Real-time Delivery
- WebSocket connection for real-time
- Server-Sent Events as fallback
- Queue system for reliability
- Batch notifications

### API Endpoints
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all read
- `GET /api/notifications/preferences` - Get prefs
- `PUT /api/notifications/preferences` - Update prefs

## Dependencies
- `pusher` or WebSocket implementation
- `bullmq` for job queue
- `nodemailer` for email notifications