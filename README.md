# URL Shortener Backend

A REST API that shortens long URLs and redirects visitors from the short link to the original. It has user accounts, JWT authentication, and role-based access (regular users see only their own links, admins see all of them).

Built while learning backend development with Node.js, Express, and MongoDB.

## Features

- User registration and login with bcrypt-hashed passwords
- JWT authentication stored in an HTTP cookie
- Auth middleware that verifies the token on protected routes
- Create a short URL (random 10-character code via `nanoid`)
- Input validation: URLs must start with `http://` or `https://`
- Get your own short URLs (ownership-scoped by user ID)
- Role-based authorization: `admin` users can view every user's URLs
- Public redirect route: anyone with a short link is sent to the original URL

## Tech Stack

Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens, bcrypt, nanoid, cookie-parser, dotenv

## Project Structure

```
controllers/   request handling logic (user, url)
middlewares/   JWT verification middleware
modules/       Mongoose models (User, URL)
routes/        route definitions
services/      token generation
connection.js  MongoDB connection
index.js       app entry point
```

## Getting Started

**1. Clone and install**

```bash
git clone https://github.com/khushi-dubey56/Url---Shortner---backend.git
cd Url---Shortner---backend
npm install
```

**2. Create a `.env` file in the project root**

```
PORT=8000
JWT_SECRET=your_secret_here
MONGO_URI=mongodb://127.0.0.1:27017/urll
```

**3. Run the server** (MongoDB must be running locally)

```bash
node index.js
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/user/signup` | No | Register a new user |
| POST | `/user/login` | No | Log in and receive a `token` cookie |
| POST | `/api/create` | Yes | Create a short URL |
| GET | `/api/all` | Yes | List short URLs (own, or all if admin) |
| GET | `/api/:shorturl` | No | Redirect to the original URL |

### Example requests

**Sign up**

```json
POST /user/signup
{
  "name": "Khushi",
  "email": "khushi@example.com",
  "password": "mypassword"
}
```

**Log in** (sets a `token` cookie; send it on later requests)

```json
POST /user/login
{
  "email": "khushi@example.com",
  "password": "mypassword"
}
```

**Create a short URL**

```json
POST /api/create
{
  "url": "https://example.com/some/very/long/path"
}
```

The response contains the generated `short` code. Visiting `http://localhost:8000/api/<short>` in a browser redirects to the original URL.

**Get your URLs**

```
GET /api/all
```

## How Authorization Works

Every new user gets `role: "user"` by default, and there is no API route to change it. Users cannot grant themselves admin access. To promote someone, update the database directly:

```js
db.users.updateOne({ email: "khushi@example.com" }, { $set: { role: "admin" } })
```

The role is stored in the signed JWT at login. On `GET /api/all`, the controller checks it: admins get every URL, regular users get only the URLs they created.

## Possible Improvements

- Set an expiry on tokens and add a refresh flow
- Track click counts per short link
- Add rate limiting on login and URL creation
- Add a simple frontend