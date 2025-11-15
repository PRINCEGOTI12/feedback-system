# Deployment Guide — Upteky Feedback Dashboard

## Prerequisites

- Git account (GitHub, GitLab, or Bitbucket)
- Render or Railway account (for backend)
- Vercel or Netlify account (for frontend)
- MySQL database (hosted or local)

## Step 1: Push to GitHub

1. Create a new GitHub repository (e.g., `upteky-feedback-dashboard`).
2. In PowerShell, from project root:

```powershell
cd d:\upteky
git remote add origin https://github.com/YOUR_USERNAME/upteky-feedback-dashboard.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

1. Visit [render.com](https://render.com).
2. Click **New** → **Web Service**.
3. Connect GitHub and select the repo.
4. Configure:
   - **Name**: `feedback-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
5. Add environment variables:
   - `DB_HOST` — your MySQL host (e.g., `db.example.com`)
   - `DB_PORT` — `3306`
   - `DB_USER` — `root`
   - `DB_PASSWORD` — your password (mark as secret)
   - `DB_NAME` — `feedback system`
6. Click **Create Web Service**.
7. Wait ~2-3 minutes for deploy. Note your live backend URL (e.g., `https://feedback-api.onrender.com`).

### MySQL on Render (Optional)

Instead of external MySQL, add a database in Render:

1. Go to **Databases** → **Create**.
2. Choose **MySQL** (or PostgreSQL), note credentials.
3. Use those credentials in backend environment variables.

## Step 3: Deploy Frontend to Vercel

1. Visit [vercel.com](https://vercel.com).
2. Click **Add New** → **Project** → **Import Git Repository**.
3. Select your GitHub repo.
4. Configure:
   - **Framework**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   - `VITE_API_BASE` — paste your live backend URL (e.g., `https://feedback-api.onrender.com`)
6. Click **Deploy**.
7. Wait ~1-2 minutes. Your frontend URL (e.g., `https://feedback-dashboard.vercel.app`) is ready.

## Step 4: Test Live

1. Open your live frontend URL in a browser.
2. Submit test feedback.
3. Check analytics update.
4. View all feedbacks in the table.

## Troubleshooting

### Backend fails to start

- Check environment variables are set correctly.
- Ensure MySQL is reachable from Render (check firewall/security groups).
- View logs in Render dashboard.

### Frontend can't reach backend

- Verify `VITE_API_BASE` is set to the correct live backend URL.
- Check browser console for CORS errors.
- Ensure backend is running.

### Database connection error

- Test MySQL credentials locally first.
- If using Render MySQL, allow connections from Render services.
- Check database name (includes space: `feedback system`).

## Optional: Database Alternatives

### PlanetScale (MySQL hosting)

1. Sign up at [planetscale.com](https://planetscale.com).
2. Create a new database.
3. Copy connection credentials.
4. Use as backend environment variables.

### AWS RDS

1. Create RDS MySQL instance.
2. Note endpoint, port, credentials.
3. Set in backend environment variables.
4. Ensure security group allows Render's IP.

## Summary

| Service  | Platform           | URL Pattern               |
| -------- | ------------------ | ------------------------- |
| Backend  | Render             | `https://feedback-api-*`  |
| Frontend | Vercel             | `https://feedback-dash-*` |
| Database | Render/PlanetScale | Varies                    |

Your deployed dashboard is now live!
