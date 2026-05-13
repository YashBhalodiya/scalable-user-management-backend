# Scalable User Management Backend

A scalable backend service built with Node.js, Express.js, PostgreSQL, and Redis featuring authentication, role-based access control, caching, pagination, and clean layered architecture.

---

## Overview

This project demonstrates how to build a scalable backend service with:

* **JWT Authentication** → secure user authentication
* **Role-Based Access Control** → protected access management
* **PostgreSQL** → persistent database storage
* **Redis** → caching & performance optimization
* **Pagination** → efficient large data fetching
* **Layered Architecture** → scalable and maintainable codebase

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Redis
* Docker
* JWT Authentication
* bcrypt
* ioredis
* pg (node-postgres)

---

## Architecture

Client → API → Redis → PostgreSQL

* Redis reduces database load using caching
* PostgreSQL stores persistent data
* Express handles API requests

---

## Features

### Authentication & Authorization

* JWT-based authentication
* Secure password hashing using bcrypt
* Role-based access control (RBAC)
* Protected routes using middleware

### ✅ User CRUD APIs

* Create user
* Get all users
* Get user by ID
* Update user
* Delete user

---

### Redis Caching

* Cache user data (`GET /users/:id`)
* Reduces response time and DB load
* Uses TTL for automatic expiration
* Reduced API response time from **186ms → 6ms**

---

### Pagination

* Server-side pagination support
* Efficient data fetching for large datasets

---

### Rate Limiting

* Prevents abuse on endpoints (e.g. login)
* Uses Redis `INCR` + `EXPIRE`

---

### Clean Layered Architecture

```txt
src/
├── controllers/
├── services/
├── routes/
├── middleware/
├── redis/
└── db/
```

* Controllers → request/response handling
* Services → business logic & database queries
* Routes → endpoint mapping
* Middlewares → authentication, validation, error handling

---

## API Endpoints

### Register User

POST /auth/register

```json
{
  "name": "Yash",
  "email": "yash@test.com",
  "password": "yash@123"
}
```

---

### Login User

POST /auth/login

```json
{
  "email": "yash@test.com",
  "password": "yash@123"
}
```

---

### Get User

GET /users/:id

---

### Update User

PUT /users/:id

```json
{
  "name": "Updated Name"
}
```

---

### Delete User

DELETE /users/:id

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/user-activity-service.git
cd user-activity-service
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create `.env` file:

```env
PORT=8001

DB_USER=your-user-name
DB_PASSWORD=your-password
DB_NAME=your-app-name
DB_HOST=localhost
DB_PORT=your-db-port

REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
```

---

### 4. Run PostgreSQL (Docker)

```bash
docker run -d \
  --name postgres-db \
  -e POSTGRES_USER=your-user-name \
  -e POSTGRES_PASSWORD=your-password \
  -e POSTGRES_DB=your-app-name \
  -p 5432:5432 \
  postgres
```

---

### 5. Run Redis (Docker)

```bash
docker run -d \
  --name redis-server \
  -p 6379:6379 \
  redis
```

---

### 6. Initialize Database

```bash
node db/init.js
```

---

### 7. Start server

```bash
npm start
```

---

## Testing

Use curl or Postman:

```bash
curl http://localhost:8001/users/1
```

---

## Error Handling

* 400 → Invalid input
* 401 → Unauthorized
* 403 → Forbidden
* 404 → Resource not found
* 429 → Too many requests
* 500 → Internal server error
  
---

## Performance Optimization

* Redis caching reduces database load
* Pagination improves query performance
* Cache invalidation maintains consistency
* Rate limiting prevents abuse

---

## Key Learnings

* Implemented JWT authentication & RBAC
* Used Redis cache-aside pattern
* Improved API performance with Redis caching
* Designed scalable layered architecture
* Built secure and maintainable REST APIs

---

## Future Improvements

* Refresh token implementation
* Swagger API documentation
* Automated testing with Jest & Supertest
* Docker Compose setup
* CI/CD integration
* Redis session management
