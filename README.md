# Mini Social Feed App (Backend)

Lightweight Node.js + Express backend for a mini social feed. Provides JWT auth and APIs for posts, likes, and comments. Designed to support mobile clients.

## Features

- JWT-based signup and login
- Create and fetch text-only posts (newest first, paginated)
- Like/unlike posts
- Comment on posts
- Ready for Firebase Cloud Messaging (FCM) notifications

## Tech Stack

- Node.js, Express, TypeScript
- MongoDB with Mongoose
- JWT for authentication

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create a `.env` file in the project root:

```bash
PORT=5050
MONGO_URI=mongodb://localhost:27017/mini_social_feed
JWT_SECRET=replace_with_strong_secret
```

Notes:

- The server can start without MongoDB for health checks, but DB-backed routes will fail until connected.
- On macOS, port 5000 may be reserved by AirPlay. Use 5050 or another free port.

### 3) Run in development

```bash
npm run dev
```

### 4) Build and run

```bash
npm run build
npm start
```

## API Overview

Base URL: `http://localhost:<PORT>`

### Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update current user

## Planned APIs (for the full task)

The following endpoints are expected for the complete assignment scope. They can be added as the project grows:

- `POST /posts` - Create a post
- `GET /posts` - Get all posts (paginated, newest first)
- `POST /posts/:id/like` - Like or unlike a post
- `POST /posts/:id/comment` - Add a comment

## Notifications (FCM)

FCM is intended for notifying users when their posts receive likes or comments. You can add:

- Firebase Admin SDK configuration
- Device token storage per user
- Event-driven notifications on like/comment

## Scripts

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Compile TypeScript to `dist/`
- `npm start` - Run compiled server

## Project Structure

```
src/
	config/
	middleware/
	models/
	modules/
	router/
	utils/
```
