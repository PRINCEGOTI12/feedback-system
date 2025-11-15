# Quick Reference — Upteky Feedback Dashboard

## Local Development

```powershell
# Terminal 1: Backend
cd d:\upteky\backend
npm install
npm run dev
# Opens http://localhost:4000

# Terminal 2: Frontend
cd d:\upteky\frontend
npm install
npm run dev
# opens http://localhost:5173
```

## Live URLs (After Deployment)

| Component | Platform           | URL                                               |
| --------- | ------------------ | ------------------------------------------------- |
| Frontend  | Vercel             | `https://feedback-dashboard.vercel.app` (example) |
| Backend   | Render             | `https://feedback-api.onrender.com` (example)     |
| Database  | Render/PlanetScale | Auto-created                                      |

## Deployment Steps (Quick)

1. **GitHub**: Push repo to GitHub
2. **Backend**: Deploy `backend/` folder to Render (set env vars: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
3. **Frontend**: Deploy `frontend/` folder to Vercel (set env var: VITE_API_BASE=<live backend URL>)
4. **Database**: Use Render MySQL or PlanetScale

See `DEPLOYMENT.md` for detailed step-by-step.

## API Endpoints

```
POST   /api/feedback          → Submit feedback
GET    /api/feedback          → List all feedbacks
GET    /api/stats             → Get analytics (total, avg rating, positive, negative)
```

## Tech Stack

- **Frontend**: React 18, Vite, CSS-in-file
- **Backend**: Express.js, MySQL2, CORS
- **Database**: MySQL
- **Hosting**: Vercel (frontend), Render (backend)

## File Structure

```
upteky/
├── backend/
│   ├── index.js          → Express server
│   ├── db.js             → MySQL init
│   ├── package.json
│   ├── .env.example
│   ├── render.yaml
│   └── README.md
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx       → Main component
│   │   ├── styles.css
│   │   └── components/
│   │       ├── FeedbackForm.jsx
│   │       ├── FeedbackTable.jsx
│   │       └── Analytics.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── README.md
├── README.md
└── DEPLOYMENT.md         → Full deployment guide
```

## Troubleshooting

| Issue                        | Solution                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------- |
| Backend won't start          | Check MySQL is running, verify `.env` credentials                             |
| Frontend can't reach backend | Ensure VITE_API_BASE points to live backend URL (not localhost in production) |
| CORS errors                  | Backend already includes CORS middleware — check backend is running           |
| Database connection fails    | Verify firewall allows connections, check DB credentials match                |

## Next Steps

1. Test locally (run both backend and frontend)
2. Push to GitHub
3. Deploy backend to Render (follow DEPLOYMENT.md)
4. Deploy frontend to Vercel (follow DEPLOYMENT.md)
5. Update frontend VITE_API_BASE to live backend URL
6. Test live URLs

---

**Status**: Ready for deployment ✓
