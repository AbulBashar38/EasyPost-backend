# EasyPost API Documentation

## Base URL
```
http://localhost:5050/api
```

## Authentication
All endpoints except `/auth/register` and `/auth/login` require authentication.

**Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Authentication Endpoints

### Register User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Login User
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "user@example.com",
    "bio": "Software developer",
    "profilePicture": "https://example.com/pic.jpg",
    "createdAt": "2025-02-09T10:30:00Z",
    "updatedAt": "2025-02-09T10:30:00Z"
  }
}
```

---

## User Endpoints

### Get Current User Profile
**Endpoint:** `GET /users/me`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**
```json
{
  "message": "User info",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "user@example.com",
    "bio": "Software developer",
    "profilePicture": "https://example.com/pic.jpg",
    "createdAt": "2025-02-09T10:30:00Z",
    "updatedAt": "2025-02-09T10:30:00Z"
  }
}
```

---

### Update Current User Profile
**Endpoint:** `PATCH /users/me`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "firstName": "Jonathan",
  "lastName": "Smith"
}
```

**Response (200):**
```json
{
  "message": "User updated",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jonathan",
    "lastName": "Smith",
    "username": "johndoe",
    "email": "user@example.com",
    "bio": "Software developer",
    "profilePicture": "https://example.com/pic.jpg",
    "createdAt": "2025-02-09T10:30:00Z",
    "updatedAt": "2025-02-09T10:35:00Z"
  }
}
```

---

## Post Endpoints

### Create a Post
**Endpoint:** `POST /posts`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "This is my first post on EasyPost!"
}
```

**Response (201):**
```json
{
  "message": "Post created",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "content": "This is my first post on EasyPost!",
    "createdAt": "2025-02-09T10:40:00Z",
    "updatedAt": "2025-02-09T10:40:00Z"
  }
}
```

**Status Codes:**
- `201` - Post created successfully
- `400` - Validation error (missing content)
- `401` - Unauthorized (no token)

---

### Get All Posts
**Endpoint:** `GET /posts`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number for pagination
- `limit` (optional, default: 10) - Number of posts per page

**Example:** `GET /posts?page=1&limit=10`

**Response (200):**
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "profilePicture": "https://example.com/pic.jpg"
      },
      "content": "This is my first post on EasyPost!",
      "likesCount": 5,
      "commentsCount": 2,
      "isLiked": true,
      "comments": [
        {
          "_id": "507f1f77bcf86cd799439013",
          "userId": {
            "_id": "507f1f77bcf86cd799439015",
            "firstName": "Jane",
            "lastName": "Smith",
            "username": "janesmith",
            "profilePicture": "https://example.com/pic2.jpg"
          },
          "postId": "507f1f77bcf86cd799439012",
          "content": "Great post!",
          "createdAt": "2025-02-09T10:50:00Z",
          "updatedAt": "2025-02-09T10:50:00Z"
        }
      ],
      "createdAt": "2025-02-09T10:40:00Z",
      "updatedAt": "2025-02-09T10:40:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10
}
```

**Status Codes:**
- `200` - Successfully retrieved posts
- `401` - Unauthorized

---

### Get Single Post
**Endpoint:** `GET /posts/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post

**Response (200):**
```json
{
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "profilePicture": "https://example.com/pic.jpg"
    },
    "content": "This is my first post on EasyPost!",
    "likesCount": 5,
    "commentsCount": 2,
    "isLiked": true,
    "comments": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "userId": {
          "_id": "507f1f77bcf86cd799439015",
          "firstName": "Jane",
          "lastName": "Smith",
          "username": "janesmith",
          "profilePicture": "https://example.com/pic2.jpg"
        },
        "postId": "507f1f77bcf86cd799439012",
        "content": "Great post!",
        "createdAt": "2025-02-09T10:50:00Z",
        "updatedAt": "2025-02-09T10:50:00Z"
      }
    ],
    "createdAt": "2025-02-09T10:40:00Z",
    "updatedAt": "2025-02-09T10:40:00Z"
  }
}
```

**Status Codes:**
- `200` - Successfully retrieved post
- `400` - Invalid post ID
- `401` - Unauthorized
- `404` - Post not found

---

### Update Post
**Endpoint:** `PATCH /posts/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post

**Request Body:**
```json
{
  "content": "Updated post content!"
}
```

**Response (200):**
```json
{
  "message": "Post updated",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "content": "Updated post content!",
    "createdAt": "2025-02-09T10:40:00Z",
    "updatedAt": "2025-02-09T10:45:00Z"
  }
}
```

**Status Codes:**
- `200` - Post updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (not your post)
- `404` - Post not found

---

### Delete Post
**Endpoint:** `DELETE /posts/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post

**Response (200):**
```json
{
  "message": "Post deleted"
}
```

**Status Codes:**
- `200` - Post deleted successfully
- `400` - Invalid post ID
- `401` - Unauthorized
- `403` - Forbidden (not your post)
- `404` - Post not found

---

## Comment Endpoints

### Create a Comment
**Endpoint:** `POST /comments/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post to comment on

**Request Body:**
```json
{
  "content": "Great post! I totally agree."
}
```

**Response (201):**
```json
{
  "message": "Comment added",
  "comment": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "postId": "507f1f77bcf86cd799439012",
    "content": "Great post! I totally agree.",
    "createdAt": "2025-02-09T10:50:00Z",
    "updatedAt": "2025-02-09T10:50:00Z"
  }
}
```

**Status Codes:**
- `201` - Comment created successfully
- `400` - Validation error (invalid postId or missing content)
- `401` - Unauthorized
- `404` - Post not found

---

### Get Comments for a Post
**Endpoint:** `GET /comments/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post

**Response (200):**
```json
{
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "profilePicture": "https://example.com/pic.jpg"
      },
      "postId": "507f1f77bcf86cd799439012",
      "content": "Great post! I totally agree.",
      "createdAt": "2025-02-09T10:50:00Z",
      "updatedAt": "2025-02-09T10:50:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Successfully retrieved comments
- `400` - Invalid post ID
- `401` - Unauthorized
- `404` - Post not found

---

### Delete Comment
**Endpoint:** `DELETE /comments/:commentId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `commentId` (required) - MongoDB ObjectId of the comment

**Response (200):**
```json
{
  "message": "Comment deleted"
}
```

**Status Codes:**
- `200` - Comment deleted successfully
- `401` - Unauthorized
- `403` - Forbidden (not your comment)
- `404` - Comment not found

---

## Like Endpoints

### Toggle Like on a Post
**Endpoint:** `POST /likes/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post to like

**Request Body:** (empty)

**Response (200) - Like Added:**
```json
{
  "message": "Post liked",
  "liked": true
}
```

**Response (200) - Like Removed:**
```json
{
  "message": "Post unliked",
  "liked": false
}
```

**Status Codes:**
- `200` - Like toggled successfully
- `400` - Invalid post ID
- `401` - Unauthorized
- `404` - Post not found

---

### Get Likes for a Post
**Endpoint:** `GET /likes/:postId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `postId` (required) - MongoDB ObjectId of the post

**Response (200):**
```json
{
  "likes": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "profilePicture": "https://example.com/pic.jpg"
      },
      "postId": "507f1f77bcf86cd799439012",
      "createdAt": "2025-02-09T11:00:00Z"
    }
  ],
  "count": 5
}
```

**Status Codes:**
- `200` - Successfully retrieved likes
- `400` - Invalid post ID
- `401` - Unauthorized
- `404` - Post not found

---

## Error Responses

### Validation Error (400)
```json
{
  "message": "Validation Failed!!!",
  "data": null,
  "errors": {
    "content": {
      "type": "field",
      "value": "",
      "msg": "Content is required",
      "path": "content",
      "location": "body"
    }
  }
}
```

### Unauthorized (401)
```json
{
  "message": "Authorization failed",
  "data": null,
  "errors": null
}
```

### Forbidden (403)
```json
{
  "message": "You can only update your own posts",
  "data": null,
  "errors": null
}
```

### Not Found (404)
```json
{
  "message": "Post not found",
  "data": null,
  "errors": null
}
```

### Server Error (500)
```json
{
  "message": "Internal Server Error",
  "data": null,
  "errors": null
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:5050/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello EasyPost!"
  }'
```

### Get All Posts
```bash
curl -X GET "http://localhost:5050/api/posts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add Comment
```bash
curl -X POST http://localhost:5050/api/comments/POST_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great post!"
  }'
```

### Like Post
```bash
curl -X POST http://localhost:5050/api/likes/POST_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Likes
```bash
curl -X GET http://localhost:5050/api/likes/POST_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Notes

1. **Authentication:** JWT tokens expire in 1 hour. Users need to login again to get a new token.
2. **Pagination:** Default page size is 10. Maximum recommended limit is 50.
3. **Timestamps:** All timestamps are in ISO 8601 format (UTC).
4. **User Reference:** When a post/comment is returned, the user is populated with firstName, lastName, username, and profilePicture.
5. **Ownership:** Users can only update/delete their own posts and comments.
6. **Cascade Delete:** Deleting a post automatically deletes all its comments and likes.
7. **Like Toggle:** Instead of separate "like" and "unlike" endpoints, toggle works on a single endpoint.
8. **Latest Comments:** When fetching a post (GET /posts and GET /posts/:postId), the API returns the latest 5 comments for that post.
9. **Like & Comment Counts:**
   - `likesCount` - Total number of likes on the post (denormalized for performance)
   - `commentsCount` - Total number of comments on the post (denormalized for performance)
   - These counts are automatically updated when users like/unlike or comment/delete comments
10. **isLiked Field:** The `isLiked` boolean indicates whether the currently authenticated user has liked the post (true if liked, false if not).
11. **Counts Update:** When a user likes/unlikes a post or creates/deletes a comment, the counts are incremented/decremented automatically.
