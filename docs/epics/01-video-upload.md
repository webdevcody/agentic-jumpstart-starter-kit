# PRP: Video Upload Feature

## Priority: 1 (Critical)

## Overview
Core functionality allowing users to upload video files with metadata.

## Requirements

### Functional Requirements
- Support for common video formats (MP4, WebM, MOV)
- File size limits (e.g., 2GB max)
- Title (required, max 100 chars)
- Description (optional, max 5000 chars)
- Thumbnail upload or auto-generation
- Progress indicator during upload
- Resumable uploads for large files

### Non-Functional Requirements
- Secure file validation
- Virus scanning
- Content moderation checks
- CDN integration for storage

## Technical Implementation

### Database Schema
```typescript
// Add to src/db/schema.ts
videos: {
  id: uuid
  userId: uuid (FK to users)
  title: string
  description: text
  videoUrl: string
  thumbnailUrl: string
  duration: integer
  fileSize: bigint
  format: string
  status: enum('processing', 'ready', 'failed')
  uploadedAt: timestamp
}
```

### Components
- `UploadForm.tsx` - Form with file picker, metadata fields
- `UploadProgress.tsx` - Progress bar with cancel option
- `ThumbnailPicker.tsx` - Select/upload thumbnail

### Server Functions
- `uploadVideo()` - Handle multipart upload
- `processVideo()` - Transcode and optimize
- `generateThumbnail()` - Auto-create thumbnail

### Storage Strategy
- Use S3-compatible storage (AWS S3, Cloudflare R2)
- Generate signed URLs for secure uploads
- Store processed videos in multiple qualities

### API Endpoints
- `POST /api/videos/upload` - Initiate upload
- `POST /api/videos/upload/:id/chunk` - Upload chunk
- `POST /api/videos/upload/:id/complete` - Finalize upload

## Dependencies
- `@tanstack/react-query` for upload state management
- `tus-js-client` for resumable uploads
- `ffmpeg` for video processing