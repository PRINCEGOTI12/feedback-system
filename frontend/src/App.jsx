import React, { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackTable from "./components/FeedbackTable";
import Analytics from "./components/Analytics";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

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
      const res = await fetch(`${API_BASE}/api/feedback`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Failed to fetch feedbacks", err);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch(`${API_BASE}/api/stats`);
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
