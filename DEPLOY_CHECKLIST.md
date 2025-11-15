# Deploy Checklist — Upteky Feedback Dashboard

## ✅ Phase 1: Preparation (Done)

- [x] Backend scaffolded (Express.js + MySQL)
- [x] Frontend scaffolded (React + Vite)
- [x] GitHub repo pushed
- [x] Backend code updated for hosted databases

## 📋 Phase 2: Database Setup (Do This Now)

**Follow this: `PLANETSCALE_SETUP.md`**

- [ ] Create PlanetScale account (free)
- [ ] Create `feedback-system` database
- [ ] Get connection credentials (host, user, password)
- [ ] Note: Copy these credentials, you'll need them next

## 🚀 Phase 3: Deploy Backend to Render

1. [ ] Go to [render.com](https://render.com) and sign in
2. [ ] Click **New** → **Web Service**
3. [ ] Connect GitHub, select your repo
4. [ ] Configure:
   - Name: `feedback-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`
5. [ ] Add environment variables (from PlanetScale):
   - `DB_HOST` = (your PlanetScale host)
   - `DB_PORT` = `3306`
   - `DB_USER` = (your PlanetScale user)
   - `DB_PASSWORD` = (your PlanetScale password, mark as Secret)
   - `DB_NAME` = `feedback-system`
6. [ ] Click **Create Web Service**
7. [ ] Wait 2–3 minutes for deployment
8. [ ] **Copy your live backend URL** (e.g., `https://feedback-api-xxxxx.onrender.com`)
9. [ ] Check logs to verify `Feedback API listening on port 4000`

## 🎨 Phase 4: Deploy Frontend to Vercel

1. [ ] Go to [vercel.com](https://vercel.com) and sign in
2. [ ] Click **Add New** → **Project** → **Import Git Repository**
3. [ ] Select your GitHub repo (`feedback-system`)
4. [ ] Configure:
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. [ ] Add environment variable:
   - `VITE_API_BASE` = (paste your live backend URL from Phase 3)
6. [ ] Click **Deploy**
7. [ ] Wait 1–2 minutes
8. [ ] **Copy your live frontend URL** (e.g., `https://feedback-dashboard-xxxxx.vercel.app`)

## ✨ Phase 5: Test Live

1. [ ] Open your **live frontend URL** in a browser
2. [ ] Submit test feedback with a name, message, and rating
3. [ ] Click **View all feedbacks** — your feedback should appear in the table
4. [ ] Check **Analytics cards**:
   - Total: 1
   - Average: (your rating)
   - Positive/Negative: Count matches your rating
5. [ ] Submit a few more feedbacks with different ratings
6. [ ] Verify analytics update automatically

## 🎉 Done!

Your feedback dashboard is **live**!

### Share Your URLs

Frontend: `https://your-dashboard.vercel.app`  
Backend: `https://your-api.onrender.com`

---

## Troubleshooting

**Backend deploy fails (ECONNREFUSED)**
- You forgot to set `DB_HOST`, `DB_PORT`, etc. on Render
- Go to Render dashboard → Environment → Add missing variables

**Frontend can't reach backend**
- Did you set `VITE_API_BASE` on Vercel? (Should match your live backend URL, not localhost)
- Check browser console for CORS errors

**Database errors**
- Verify PlanetScale credentials are correct
- Check database name is `feedback-system` (no spaces allowed)
- Ensure you copied all 5 environment variables to Render

---

**Questions?** Check `DEPLOYMENT.md` for more detailed instructions.
