# PRP: Subscriptions Feature

## Priority: 8 (Medium)

## Overview
Allow users to subscribe to channels and receive updates.

## Requirements

### Functional Requirements
- Subscribe/unsubscribe to channels
- List user's subscriptions
- Show subscriber count
- Subscription feed
- New video notifications
- Bell icon for notification preferences

### Non-Functional Requirements
- Handle millions of subscriptions
- Real-time subscriber count updates
- Efficient feed generation

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
subscriptions: {
  id: uuid
  subscriberId: uuid (FK to users)
  channelId: uuid (FK to users)
  notificationEnabled: boolean (default true)
  subscribedAt: timestamp
  UNIQUE (subscriberId, channelId)
}

// Add to userProfiles
userProfiles: {
  ...existing
  subscriberCount: integer (default 0)
}
```

### Components
- `SubscribeButton.tsx` - Subscribe/unsubscribe button
- `SubscriptionList.tsx` - User's subscriptions
- `SubscriberCount.tsx` - Channel subscriber display
- `SubscriptionFeed.tsx` - Videos from subscriptions

### Server Functions
- `subscribe()` - Create subscription
- `unsubscribe()` - Remove subscription
- `getSubscriptions()` - List user's subscriptions
- `getSubscriptionFeed()` - Generate feed
- `updateSubscriberCount()` - Update denormalized count

### Feed Generation
- Query videos from subscribed channels
- Sort by upload date
- Implement pagination
- Cache feed for performance

### API Endpoints
- `POST /api/channels/:id/subscribe` - Subscribe
- `DELETE /api/channels/:id/subscribe` - Unsubscribe
- `GET /api/users/subscriptions` - List subscriptions
- `GET /api/feed/subscriptions` - Subscription feed

## Dependencies
- Use existing React Query setup
- Consider Redis for feed caching