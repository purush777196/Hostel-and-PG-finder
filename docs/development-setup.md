# Development Setup Guide: Hostel and PG Finder

This document provides step-by-step instructions for preparing your local development environment, configuring dependencies, setting environment variables, and running the application.

---

## 1. Prerequisites

Ensure the following tools are installed on your workstation:

- **Node.js**: v18.x or higher (tested on v22.17.x)
- **npm**: v9.x or higher (tested on v11.4.x)
- **Git**: v2.30 or higher
- **MongoDB** *(Optional for Phase 0)*: Community Server v6.x or higher / MongoDB Atlas URI

Verify your installations:
```bash
node -v
npm -v
git --version
```

---

## 2. Cloning and Checking Out the Feature Branch

```bash
git clone https://github.com/purush777196/Hostel-and-PG-finder.git
cd Hostel-and-PG-finder
git checkout feature/project-setup
```

---

## 3. Installing Dependencies

Install dependencies across the monorepo root, client, and server:

### Option A: One-step installation (Recommended)
```bash
npm run install:all
```

### Option B: Manual per-directory installation
```bash
# Install root dependencies (concurrently)
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

---

## 4. Environment Variables Configuration

Copy the example environment files in both `server/` and `client/` directories:

### Backend Configuration
```bash
cp server/.env.example server/.env
```

Contents of `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/hostel_pg_finder
CLIENT_URL=http://localhost:5173
```

### Frontend Configuration
```bash
cp client/.env.example client/.env
```

Contents of `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> [!IMPORTANT]
> Never commit actual `.env` files to Git. Both `server/.env` and `client/.env` are ignored by `.gitignore`.

---

## 5. Running the Application

### Option A: Run Full-Stack Concurrently
From the root directory:
```bash
npm run dev
```
This boots both the Express server (port `5000`) and the Vite React frontend (port `5173`) in a single terminal.

### Option B: Run Services Independently

#### Run Backend Server:
```bash
# From root:
npm run server

# Or from /server:
cd server
npm run dev
```
Backend API will be accessible at: `http://localhost:5000`

#### Run Frontend Client:
```bash
# From root:
npm run client

# Or from /client:
cd client
npm run dev
```
Frontend application will be accessible at: `http://localhost:5173`

---

## 6. Verifying API Health

Test the health-check endpoint using curl or your browser:

```bash
curl http://localhost:5000/api/health
```

Expected HTTP 200 response:
```json
{
  "success": true,
  "message": "Hostel and PG Finder API is running"
}
```

---

## 7. Running Backend Tests

Run the automated backend test suite:

```bash
cd server
npm test
```

Or from the monorepo root:
```bash
npm run test:server
```

---

## 8. Building Frontend for Production

```bash
cd client
npm run build
```
Production assets are generated in `client/dist/`.

---

## 9. Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `EADDRINUSE: port 5000` | Port 5000 is occupied by another process | Kill the process or change `PORT` in `server/.env` |
| `CORS Error in Browser` | `CLIENT_URL` does not match frontend origin | Check `CLIENT_URL` in `server/.env` matches `http://localhost:5173` |
| `MongoDB Connection Failed` | Local MongoDB daemon is not running | Non-fatal for Phase 0. Start MongoDB service or provide a valid Atlas URI |

