# User Activity Service

A backend service built with Node.js, PostgreSQL, and Redis to manage user data efficiently with caching, rate limiting, and clean architecture.

---

## Overview

This project demonstrates how to build a scalable backend service by separating concerns between:

* **Database (PostgreSQL)** → source of truth
* **Redis** → caching & performance layer
* **API Layer (Express)** → request handling

---

## Tech Stack

* Node.js (Express)
* PostgreSQL
* Redis (Docker)
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

### ✅ User CRUD APIs

* Create user
* Get user by ID
* Update user
* Delete user

---

### Redis Caching

* Cache user data (`GET /users/:id`)
* Reduces response time and DB load
* Uses TTL for automatic expiration

---

### Rate Limiting

* Prevents abuse on endpoints (e.g. login)
* Uses Redis `INCR` + `EXPIRE`

---

### Clean Architecture

* Controllers → request/response logic
* Services → database queries
* Routes → endpoint mapping

---

## API Endpoints

### Create User

POST /users

```json
{
  "name": "Yash",
  "email": "yash@mail.com"
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
* 404 → Resource not found
* 500 → Internal server error

---

## 📊 Key Learnings

* Implemented cache-aside pattern using Redis
* Designed API with proper separation of concerns
* Reduced database load using in-memory caching
* Handled input validation and error responses

---

## Future Improvements

* Add authentication (JWT)
* Add pagination
* Add automated tests (Jest + Supertest)
* Dockerize entire app (API + DB + Redis)
