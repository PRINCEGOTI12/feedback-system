const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const PORT = process.env.PORT || 4000;

async function main() {
    const pool = await db.init();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => res.send({ ok: true, service: "feedback-api" }));

    app.post("/api/feedback", async(req, res) => {
        try {
            const { name, email, message, rating } = req.body;

            if (!name || !name.toString().trim()) {
                return res.status(400).json({ error: "Name is required" });
            }
            if (!message || !message.toString().trim()) {
                return res.status(400).json({ error: "Message is required" });
            }

            const ratingNum = Number.isInteger(rating) ?
                rating :
                parseInt(rating) || null;

            const [result] = await pool.execute(
                "INSERT INTO `feedbacks` (`name`,`email`,`message`,`rating`) VALUES (?,?,?,?)", [
                    name.toString().trim(),
                    email || null,
                    message.toString().trim(),
                    ratingNum,
                ]
            );

            const insertId = result.insertId;
            const [createdRows] = await pool.execute(
                "SELECT * FROM `feedbacks` WHERE id = ?", [insertId]
            );
            return res.status(201).json(createdRows[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    app.get("/api/feedback", async(req, res) => {
        try {
            const [rows] = await pool.execute(
                "SELECT * FROM `feedbacks` ORDER BY createdAt DESC"
            );
            return res.json(rows);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    app.get("/api/stats", async(req, res) => {
        try {
            const [rows] = await pool.execute(
                `SELECT
                    COUNT(*) as total,
                    ROUND(AVG(rating),2) as avgRating,
                    SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as positive,
                    SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) as negative
                FROM \`feedbacks\``
            );

            return res.json(
                rows[0] || { total: 0, avgRating: null, positive: 0, negative: 0 }
            );
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    app.listen(PORT, () => {
        console.log(`Feedback API listening on port ${PORT}`);
    });
}

main().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});