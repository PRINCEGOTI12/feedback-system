import React, { useState } from "react";

export default function FeedbackForm({ onSaved, apiBase }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !message.trim()) {
      setError("Name and message are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, rating: Number(rating) }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
      if (onSaved) await onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Submit Feedback</h2>
      {error && <div className="error">{error}</div>}
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Message</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />

      <label>Rating</label>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value={5}>5</option>
        <option value={4}>4</option>
        <option value={3}>3</option>
        <option value={2}>2</option>
        <option value={1}>1</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
