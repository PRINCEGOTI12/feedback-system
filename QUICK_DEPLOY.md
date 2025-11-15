# 🚀 Quick Deploy to Netlify

## 5-Minute Setup

### 1. Create Free PostgreSQL Database (2 min)

Go to **[supabase.com](https://supabase.com)**:

- Sign up with GitHub
- Create project `feedback-system`
- Copy connection string (Settings → Database)
- String looks like: `postgresql://postgres:PASSWORD@HOST:PORT/postgres?sslmode=require`

### 2. Deploy to Netlify (3 min)

Go to **[netlify.com](https://netlify.com)**:

1. Click **Add new site** → **Import existing project**
2. Select your GitHub repo (`feedback-system`)
3. Build settings:
   - Build command: `npm run build`
   - Publish: `frontend/dist`
4. Add environment variable:
   - `DATABASE_URL` = (your Supabase connection string)
5. Click **Deploy**

### 3. Done! ✅

Your dashboard is live at `https://your-site.netlify.app`

---

## Testing

1. Open your live URL
2. Submit feedback (name, email, message, 1-5 rating)
3. See it appear in the table
4. Check analytics update

---

## Architecture

```
Netlify
├── Frontend (React + Vite)
│   └── Served as static site
├── Backend (Netlify Functions)
│   ├── /api/feedback (POST/GET)
│   └── /api/stats (GET)
└── Database → Supabase PostgreSQL
```

---

## Troubleshooting

**Deploy fails?**

- Check `DATABASE_URL` env var is set on Netlify
- Verify connection string from Supabase

**Functions don't work?**

- Check Netlify build logs
- Ensure `pg` module installed

**Can't reach backend?**

- Check `netlify.toml` has redirect rules
- Frontend uses `/api` paths automatically

---

**Live URLs:**

- Frontend: https://your-dashboard.netlify.app
- Backend: https://your-dashboard.netlify.app/api/feedback (auto-routed to functions)
- Database: Supabase (managed)

See `NETLIFY_FULL_DEPLOY.md` for detailed instructions.
