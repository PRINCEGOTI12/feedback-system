# Upteky Feedback Backend

Simple Express.js API for feedback management used in the Upteky SDE intern task.

Requirements

- Node.js 16+
- MySQL running and reachable

Default DB credentials (used if no `.env` provided):

- hostname: `127.0.0.1`
- port: `3306`
- username: `root`
- password: `1234`
- database: `feedback system` (the example uses a space in the name)

Quick start (Windows PowerShell)

```powershell
cd backend
npm install
# copy and edit .env if needed
copy .env.example .env
# start server
npm run dev
```

API endpoints

- `POST /api/feedback` - body: `{ name, email, message, rating }` - returns created feedback
- `GET /api/feedback` - returns all feedbacks
- `GET /api/stats` - returns `{ total, avgRating, positive, negative }`

Sample curl

```powershell
curl -X POST http://localhost:4000/api/feedback -H "Content-Type: application/json" -d '{"name":"Alice","email":"a@e.com","message":"Great!","rating":5}'
curl http://localhost:4000/api/feedback
curl http://localhost:4000/api/stats
```
