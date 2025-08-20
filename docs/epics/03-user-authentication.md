# PRP: User Authentication Enhancement

## Priority: 3 (Critical)

## Overview
Enhance existing Better Auth implementation with user profiles and permissions.

## Requirements

### Functional Requirements
- User registration with email verification
- Social login (Google, GitHub)
- User profiles with avatars
- Role-based permissions
- Password reset flow
- Session management
- Remember me option

### Non-Functional Requirements
- Secure password hashing
- Rate limiting
- CSRF protection
- JWT token refresh

## Technical Implementation

### Database Schema
```typescript
// Extend existing user schema
userProfiles: {
  id: uuid
  userId: uuid (FK to users)
  displayName: string
  bio: text
  avatarUrl: string
  channelName: string (unique)
  verifiedAt: timestamp
  role: enum('viewer', 'creator', 'moderator', 'admin')
  createdAt: timestamp
}
```

### Components
- `UserProfile.tsx` - Profile display/edit
- `AvatarUpload.tsx` - Profile picture upload
- `PermissionGate.tsx` - Role-based UI rendering

### Server Functions
- `updateProfile()` - Update user profile
- `uploadAvatar()` - Handle avatar upload
- `verifyEmail()` - Email verification
- `checkPermission()` - Authorization checks

### Authentication Flow
1. Leverage existing Better Auth setup
2. Add profile creation after signup
3. Implement role checks in middleware
4. Add protected route wrappers

### API Endpoints
- Already handled by Better Auth at `/api/auth/*`
- Add: `PUT /api/users/profile` - Update profile
- Add: `POST /api/users/avatar` - Upload avatar

## Dependencies
- Already using Better Auth
- Add: `@uploadthing/react` for avatar uploads