# Node.js Backend Learning Spec (AI Assistant System)

## 👤 Learner Profile
- Frontend developer (Angular background)
- Current goal: Become a backend + AI-enabled full-stack engineer
- Long-term direction: Build and ship AI-powered products
- Learning style:
  - 30 mins/day focused learning
  - Build-first approach (learn by doing)
  - No blind copy-paste coding
  - Prefer guided thinking + debugging support

---

# 📁 Project Context

## Repository
AI-Assistant-System

## Vision
Evolving project that will become:
- Full-stack application (Frontend + Backend)
- AI-integrated system
- Deployable production-grade app
- Portfolio demonstration of engineering growth

---

# 🏗️ Current Project Structure

AI-Assistant-System/
  backend/
  frontend/ (planned)
  docs/
  README.md
  PROGRESS.md

---

# ✅ What Has Been Completed (Backend Foundations)

## 1. Node.js Fundamentals
- Understood Node.js runtime
- Running JS using `node index.js`
- Learned module system (`require`)
- Imported built-in `http` module

## 2. HTTP Server (Raw Node)
- Built server using `http.createServer`
- Understood request-response lifecycle
- Learned:
  - req (request)
  - res (response)
  - res.end()
  - server.listen(port)

## 3. Routing with Raw Node
Implemented manual routing using:
- `req.url`
- if/else conditions

Routes built:
- /
- /about
- /time
- fallback route

## Key Learning:
- Backend is event-driven
- Server responds only when request arrives

---

## 4. Express.js Introduction

### Setup
- Installed Express using npm
- Understood node_modules

### Core Concepts Learned
- `express()` creates app instance
- `app.listen()` starts server
- `app.get()` defines routes

### Routes Implemented
- /
- /about
- /time

---

## 5. API Development (GET APIs)

Created REST-like endpoints:

### Endpoints
- GET /api/users
- GET /api/products
- GET /api/profile

### Response Types
- Arrays
- Objects
- Nested objects

### Key Learnings
- Express auto-converts JS objects to JSON
- Browser can be used to test APIs
- API endpoints are data providers, not UI pages

---

## 6. POST Requests + Request Body

### Endpoint Built
- POST /api/createUser

### Concepts Learned
- `app.post()` defines an endpoint that accepts submitted data
- Client sends JSON data in the request body
- `express.json()` middleware parses incoming JSON
- Parsed request data is available as `req.body`
- Server should read from `req.body`, not manually assign data to it

### Testing Learned
- Browser address bar is mainly useful for simple GET requests
- POST requests need a tool that can send a request body
- Tested POST API using Postman
- Used:
  - Method: POST
  - URL: http://localhost:3000/api/createUser
  - Body type: raw JSON
  - Header: Content-Type: application/json

### Debugging Lesson
- A 404 occurred even though the POST route existed
- Root cause: custom 404 middleware was placed before the POST route
- Express runs routes and middleware from top to bottom
- A fallback 404 handler should be placed at the end of the file

### Working Behavior
- Request body:
  ```json
  {
    "name": "Asha",
    "role": "Frontend Developer"
  }
  ```
- Response body:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "name": "Asha",
      "role": "Frontend Developer"
    }
  }
  ```

---

# 🧠 Core Concepts Understood

- Request → Response lifecycle
- Browser is an HTTP client
- Backend routes vs frontend routes difference
- Express abstraction over raw Node
- JSON as API communication format
- Routing + handler function model
- POST request body handling
- Express middleware order matters
- 404 fallback middleware should be last
- Postman can test APIs that need methods and bodies beyond browser GET

---

# ⚙️ Current Capabilities

The learner can:
- Build Express server
- Create REST GET APIs
- Create basic POST APIs
- Return JSON responses
- Read submitted JSON data using `req.body`
- Test POST APIs using Postman
- Understand req/res flow
- Debug basic backend issues
- Debug route-order problems in Express
- Use Git for version tracking

---

# 🧭 Immediate Next Step (Current Sprint)

## Topic: Basic Request Validation

### Goals
- Learn how backend protects itself from incomplete client input
- Understand:
  - required fields
  - `400 Bad Request`
  - early return after sending an error response
  - validating `req.body.name`
  - validating `req.body.role`

### Validation Exercise
- Update POST /api/createUser to reject missing data
- If `name` or `role` is missing, return:
  ```json
  {
    "message": "Name and role are required"
  }
  ```
- Use HTTP status code:
  ```txt
  400 Bad Request
  ```

---

# 📈 Next Learning Roadmap

## Phase 1 — Backend Core (Current)
- GET APIs ✅
- POST APIs ✅
- JSON body parsing middleware ✅
- Middleware order ✅
- Basic request validation (current)
- Error handling
- API structuring patterns

---

## Phase 2 — Database Integration
- PostgreSQL or MongoDB
- CRUD operations
- Database connections
- Schema design basics

---

## Phase 3 — Frontend Integration
- Angular HttpClient
- API consumption
- Async handling
- UI state management

---

## Phase 4 — AI Integration
- LLM API integration
- Prompt structuring
- Chat endpoint design
- AI response handling

---

## Phase 5 — DevOps & Deployment
- Docker basics
- Environment variables
- Production deployment
- Basic system monitoring

---

# 🎯 Final Career Objective

Become:

> Frontend + Backend + AI-integrated Product Engineer

Capable of:
- Building full-stack apps
- Integrating AI features
- Deploying production systems
- Understanding system architecture

---

# 🧑‍🏫 Learning Style Rules (IMPORTANT)

- Avoid full copy-paste solutions
- Prefer guided reasoning
- Learn through debugging
- Build alongside learning
- Maintain GitHub documentation
- Focus on understanding over speed
