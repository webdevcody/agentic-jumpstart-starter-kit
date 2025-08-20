# TechTube - Video Sharing Platform

A modern video sharing platform built with TanStack Start, allowing users to upload, watch, and engage with video content.

## Core Features

### Video Management

- **Upload**: Users can upload videos with titles, descriptions, and thumbnails
- **Watch**: Stream videos with adaptive quality playback
- **Discovery**: Browse trending, recommended, and categorized content

### User Engagement

- **Comments**: Threaded discussions on each video
- **Likes/Dislikes**: Rate videos to help surface quality content
- **Subscriptions**: Follow creators to get updates on new uploads
- **Notifications**: Alerts for new videos from subscribed channels

### Creator Tools

- **Channel Management**: Customizable channel pages with branding
- **Analytics**: View counts, watch time, and audience demographics
- **Playlists**: Organize videos into collections
- **Monetization**: Ad integration and viewer support options

### Platform Features

- **Search**: Find videos by title, description, tags, or creator
- **Recommendations**: AI-powered content suggestions based on watch history
- **Categories**: Browse by genre (Gaming, Music, Education, etc.)
- **History**: Track watched videos and resume playback
- **Watch Later**: Save videos for future viewing

## Technical Architecture

- **Frontend**: React with TanStack Router for SPA navigation
- **Backend**: Node.js server functions for API endpoints
- **Database**: PostgreSQL for user data, video metadata, and interactions
- **Storage**: Cloud object storage for video files and thumbnails
- **Streaming**: HLS/DASH for adaptive bitrate video delivery
- **Auth**: Better Auth for user authentication and sessions
- **Search**: Full-text search with PostgreSQL or dedicated search service

## User Roles

- **Viewers**: Watch, comment, like, and subscribe
- **Creators**: Upload videos, manage channels, view analytics
- **Moderators**: Review flagged content, manage community guidelines
- **Admins**: Platform-wide content management and user administration
