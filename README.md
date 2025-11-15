# Upteky Feedback Dashboard

Full-stack feedback management system for the Upteky SDE intern task.

## Structure

- **`backend/`** — Express.js API (Node.js + MySQL)
- **`frontend/`** — React + Vite dashboard

## Quick Start (Local)

### Backend

```powershell
cd backend
npm install
copy .env.example .env
npm run dev
```

Server runs on `http://localhost:4000`.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

Ensure backend is running before frontend.

## Deployment

**Important**: You **must** use a **hosted database** (PlanetScale, Render PostgreSQL, etc.) for Render deployment. Localhost MySQL won't work!

### Step 1: Set Up Database

**Recommended: PlanetScale (Free MySQL Hosting)**

See `PLANETSCALE_SETUP.md` for step-by-step instructions.

### Step 2: Backend → Render

1. Push to GitHub.
2. Create new web service on Render using the `backend` folder.
3. Set environment variables with your PlanetScale (or hosted DB) credentials:
   - `DB_HOST` (e.g., `abc123.psdb.cloud`)
   - `DB_PORT` (usually `3306`)
   - `DB_USER`
   - `DB_PASSWORD` (mark as Secret)
   - `DB_NAME` (e.g., `feedback-system`)
4. Deploy and note the live backend URL.

### Step 3: Frontend → Vercel

1. Push to GitHub.
2. Import repo on Vercel, select the `frontend` folder.
3. Set build command: `npm run build`
4. Set environment variable: `VITE_API_BASE=<live backend URL>`
5. Deploy and note the live frontend URL (e.g., `https://feedback-dashboard.vercel.app`)

### Database

Use a hosted MySQL:

- **Render**: Add a PostgreSQL database in Render (MySQL also available).
- **PlanetScale**: Free tier MySQL hosting.
- **AWS RDS**: Managed MySQL.

Or deploy backend with SQLite (embedded) if you prefer no external DB.

## API Endpoints

- `POST /api/feedback` — Submit feedback
- `GET /api/feedback` — List all feedbacks
- `GET /api/stats` — Analytics (total, avg rating, positive, negative)

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js + MySQL2
- **Deployment**: Vercel + Render (or Railway)
