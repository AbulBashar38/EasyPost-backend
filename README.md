# EasyPost Backend

Lightweight Node.js + Express backend for EasyPost, a mini social feed app. Provides JWT auth and APIs for posts, likes, and comments. Designed to support mobile clients.

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
MONGO_URI=mongodb://localhost:27017/easypost
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

### Posts

- `POST /api/posts` - Create a post
- `GET /api/posts` - Get all posts (paginated, newest first)

### Likes

- `POST /api/posts/:id/like` - Like or unlike a post

### Comments

- `POST /api/posts/:id/comment` - Add a comment

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
		db.ts
	middleware/
		auth.ts
		checkLogin.ts
		errorHandler.ts
	models/
		Comment.ts
		Like.ts
		Post.ts
		User.ts
	modules/
		auth/
			auth.controller.ts
			auth.router.ts
			auth.validator.ts
		comment/
			comment.controller.ts
			comment.router.ts
			comment.validator.ts
		like/
			like.controller.ts
			like.router.ts
			like.validator.ts
		post/
			post.controller.ts
			post.router.ts
			post.validator.ts
		user/
			user.controller.ts
			user.router.ts
			user.validator.ts
	router/
		router.ts
	utils/
		counterUtils.ts
		jwt.ts
	index.ts
```
