import React, { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackTable from "./components/FeedbackTable";
import Analytics from "./components/Analytics";

// For local dev: http://localhost:3000 (Netlify dev)
// For production: auto-routes via netlify.toml
const API_BASE = "/api";

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    avgRating: null,
    positive: 0,
    negative: 0,
  });

  async function fetchAll() {
    try {
      const res = await fetch(`${API_BASE}/feedback`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Failed to fetch feedbacks", err);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  }

  useEffect(() => {
    fetchAll();
    fetchStats();
  }, []);

  async function handleNewFeedback() {
    await fetchAll();
    await fetchStats();
  }

  return (
    <div className="container">
      <h1>Feedback Dashboard</h1>
      <Analytics stats={stats} />
      <FeedbackForm onSaved={handleNewFeedback} apiBase={API_BASE} />
      <FeedbackTable feedbacks={feedbacks} />
    </div>
  );
}
