# Frontend (Feedback Dashboard)

Quick start (Windows PowerShell):

```powershell
cd d:\upteky\frontend
npm install
npm run dev
```

The app expects the backend at `http://localhost:4000` by default. To change, set `VITE_API_BASE` in your environment before running the dev server.

Features:

- Submit feedback (Name, Email, Message, Rating)
- View all feedbacks in a table
- Analytics cards: total, average rating, positive vs negative
