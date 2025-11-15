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

### Backend → Render / Railway

1. Push to GitHub (see instructions below).
2. Create new service on Render or Railway using the `backend` folder.
3. Set environment variables:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Or use a hosted MySQL (e.g., Render MySQL, PlanetScale, or AWS RDS)
4. Deploy and note the live backend URL (e.g., `https://feedback-api.onrender.com`)

### Frontend → Vercel

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
