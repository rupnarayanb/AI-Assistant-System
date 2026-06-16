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

## 7. Route Params + Read By ID

### Endpoint Built
- GET /api/users/:id

### Concepts Learned
- Route parameters are dynamic parts of the URL
- `req.params.id` gives access to the value in the path
- URL values arrive as strings and often need conversion before comparison
- Backend can search an in-memory array to find a matching record
- A missing record should return `404 Not Found`

### Working Behavior
- `GET /api/users/1` returns the matching user
- If no matching user exists, the API returns a not-found response

---

## 8. PUT Requests + Update By ID

### Endpoint Built
- PUT /api/users/:id

### Concepts Learned
- `PUT` updates an existing resource
- `req.params.id` identifies the record to update
- `req.body` carries the new values
- Update logic should find the existing item first, then modify it
- Missing records should still return `404 Not Found`

### Working Behavior
- `PUT /api/users/1` updates the matching user
- The updated record is returned after the change

---

## 9. DELETE Requests + Remove By ID

### Endpoint Built
- DELETE /api/users/:id

### Concepts Learned
- `DELETE` removes an existing resource
- Route params identify which record to remove
- The in-memory array can be filtered or spliced to remove a match
- A missing record should return `404 Not Found`
- Successful delete should confirm the record was removed

### Working Behavior
- `DELETE /api/users/1` removes the matching user from memory
- The remaining users stay available in the array

---

## 10. Express Router Upgrade

### What Was Done
- Replaced the route-constants file with a real `express.Router()`
- Moved the small GET routes into the router file
- Mounted the router from `index.js` with `app.use(...)`

### Concepts Learned
- A router file owns route handlers directly
- `index.js` should stay focused on app setup and server startup
- `express.Router()` is the right tool when route groups start to grow
- Route behavior should stay the same after the move

### Current Router Scope
- `/api/user`
- `/about`
- `/time`

### Remaining Work in This Phase
- Move one CRUD route into the router next
- Keep `users` state working while the routes are split
- Learn when a router file should own paths versus handlers

---

## 11. Shared State Router Factory

### What Was Done
- Changed `expressroutes.js` from a plain router export into a router factory
- Passed shared app state from `index.js` into the router factory
- Kept `users` and `nextId` available to mutating routes through the shared state object

### Concepts Learned
- A router factory can receive dependencies from `index.js`
- Reference types like arrays can be shared through an object
- Counter values should live inside the shared state object if they must advance across requests
- The router can own route behavior while `index.js` owns application state creation

### Current Shared-State Scope
- `users`
- `nextId`
- `POST /api/createUser`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/users`

---

## 12. PostgreSQL Learning Start

### What Was Decided
- PostgreSQL is the first database to learn for this app
- `users` array is the v1 in-memory version of a database table
- `POST /api/createUser` will be the first route to migrate later
- Database credentials will live in environment variables

### Concepts Learned
- PostgreSQL is the persistent storage layer for backend data
- Tables store structured rows that mirror your current user objects
- A Node app connects to PostgreSQL through a driver/client library
- A separate connection file and query/service file will keep the backend organized

### Current PostgreSQL Scope
- table shape: `users(id, name, role)`
- first database route: `POST /api/createUser`
- future config values: host, port, database, user, password

### Latest Status
- still using in-memory state for the app
- no PostgreSQL driver installed yet
- no connection file created yet
- ready to start practical database setup next

## 13. PostgreSQL Installation & Exploration

### Completed
- Installed PostgreSQL 17 using Homebrew
- Started PostgreSQL service
- Verified installation using `psql --version`
- Entered PostgreSQL shell using `psql postgres`
- Listed databases using `\l`

### Concepts Learned
- PostgreSQL is a database server independent of Node.js
- PostgreSQL persists data to disk
- In-memory arrays disappear after server restart
- PostgreSQL typically listens on port `5432`

### Progress Update
- Created database: `ai_assistant`
- Connected to database using `psql ai_assistant`
- Learned difference between terminal commands and SQL commands
- Learned that `psql` is a client used to connect to PostgreSQL


## 14. First Database & Table

### Completed
- Created database: `ai_assistant`
- Connected using `psql ai_assistant`
- Created table: `users`
- Listed tables using `\dt`

### SQL Learned
- `CREATE DATABASE`
- `CREATE TABLE`

### Concepts Learned
- Databases contain tables
- Tables contain rows
- Columns require explicit data types
- PostgreSQL validates schema during table creation

### Current Schema
users(
  id INTEGER,
  name TEXT,
  role TEXT
)

### Pending
- Insert first row
- Query data using SELECT
- Update rows
- Delete rows
- Add auto-generated IDs

### Progress Update
- Created `users` table
- Inserted first row into PostgreSQL
- Queried data using `SELECT * FROM users;`

### SQL Learned
- CREATE DATABASE
- CREATE TABLE
- INSERT INTO ... VALUES ...
- SELECT ... FROM ...

### CRUD Status
- Create ✅
- Read ✅
- Update ⏳
- Delete ⏳

### Current Architecture
Angular
  ↓
Node/Express
  ↓
PostgreSQL (planned)
  ↓
Disk persistence

### Pending
- Create `ai_assistant` database
- Connect to the database
- Create `users` table
- Insert first row
- Run first SQL query

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
- Route parameters with `req.params`
- In-memory CRUD with arrays
- `404 Not Found` for missing records
- `PUT` updates existing resources
- `DELETE` removes existing resources
- CommonJS `require` / `module.exports`
- `express.Router()` for grouped routes
- Separating reusable route data from server setup
- Router factories for injected state
- Shared state object passed from `index.js`
- PostgreSQL as persistent storage
- Table/row/column model
- Connection file vs service file

---

# ⚙️ Current Capabilities

The learner can:
- Build Express server
- Create REST GET APIs
- Create basic POST APIs
- Read a record by id
- Update a record by id
- Delete a record by id
- Organize routes into a router file
- Pass shared state into a router factory
- Return JSON responses
- Read submitted JSON data using `req.body`
- Test POST APIs using Postman
- Understand req/res flow
- Debug basic backend issues
- Debug route-order problems in Express
- Use Git for version tracking
- Plan PostgreSQL table and connection setup

---

# 🧭 Immediate Next Step (Current Sprint)

## Topic: PostgreSQL Setup Start

### Goals
- Learn how backend state moves from memory to PostgreSQL
- Understand:
  - why in-memory state is only temporary
  - database as a persistent data store
  - basic connection setup
  - how CRUD will map to database operations
  - how the `users` table maps to current app data

### Today’s Task
- Learn the PostgreSQL table shape for `users(id, name, role)`
- Learn the conceptual role of a connection file
- Learn the conceptual role of a query/service file
- Map `POST /api/createUser` to a future SQL `INSERT`
- Keep the current in-memory router factory working while planning the DB migration

---

# 📈 Next Learning Roadmap

## Phase 1 — Backend Core (Current)
- GET APIs ✅
- POST APIs ✅
- PUT APIs ✅
- DELETE APIs ✅
- JSON body parsing middleware ✅
- Middleware order ✅
- Route params ✅
- Basic request validation ✅
- Error handling ✅
- Express router upgrade ✅
- Shared state router factory ✅
- PostgreSQL learning start (current)

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
