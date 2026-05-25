## Backend Progress
- Migrated from raw Node HTTP server to Express
- Added route handling
- Added JSON request body parsing with `express.json()`
- Added first POST API
- Tested POST API using Postman
- Implemented:
  - /
  - /about
  - /time

## Run Backend

From the project root:

```bash
node backend/index.js
```

Server runs on:

```txt
http://localhost:3000
```

## APIs Implemented

### GET APIs
- GET /
- GET /about
- GET /time
- GET /user
- GET /api/users
- GET /api/products
- GET /api/profile

### POST APIs
- POST /api/createUser

Request body:

```json
{
  "name": "Asha",
  "role": "Frontend Developer"
}
```

Response body:

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

## Testing

### GET Requests
GET routes can be tested directly in the browser:

```txt
http://localhost:3000/api/users
```

### POST Requests
POST routes need a client that can send a request body, such as Postman.

Postman setup:
- Method: POST
- URL: http://localhost:3000/api/createUser
- Body: raw JSON
- Header: Content-Type: application/json

## Concepts Learned
- Express routing
- JSON responses
- Nested object structures
- API endpoint conventions
- Difference between GET and POST testing
- `app.post()` for accepting submitted data
- `req.body` for reading client-submitted JSON
- `express.json()` middleware for parsing request bodies
- Express runs middleware and routes from top to bottom
- Custom 404 fallback middleware should be placed at the end

## Current Next Step

Add basic request validation to POST /api/createUser:
- Reject missing `name`
- Reject missing `role`
- Return `400 Bad Request` for invalid input
