import React from "react";

export default function FeedbackTable({ feedbacks }) {
  return (
    <div className="table-wrap">
      <h2>All Feedbacks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No feedbacks yet
              </td>
            </tr>
          )}
          {feedbacks.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.rating}</td>
              <td>{f.message}</td>
              <td>{new Date(f.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
