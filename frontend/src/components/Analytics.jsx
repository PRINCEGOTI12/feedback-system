import React from "react";

export default function Analytics({ stats }) {
  return (
    <div className="analytics">
      <div className="card">
        <div className="label">Total</div>
        <div className="value">{stats.total ?? 0}</div>
      </div>
      <div className="card">
        <div className="label">Average</div>
        <div className="value">{stats.avgRating ?? "N/A"}</div>
      </div>
      <div className="card">
        <div className="label">Positive (4+)</div>
        <div className="value">{stats.positive ?? 0}</div>
      </div>
      <div className="card">
        <div className="label">Negative (&lt;3)</div>
        <div className="value">{stats.negative ?? 0}</div>
      </div>
    </div>
  );
}
