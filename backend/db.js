const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_NAME = process.env.DB_NAME || "feedback_system";

async function init() {
    // Create a temporary connection to create the database
    const adminPool = new Pool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: "postgres", // Connect to default postgres DB first
    });

    try {
        // Try to create database (will fail silently if it exists)
        await adminPool.query(`CREATE DATABASE "${DB_NAME}"`);
        console.log(`Database "${DB_NAME}" created (or already exists)`);
    } catch (err) {
        if (!err.message.includes("already exists")) {
            console.log("Database already exists, continuing...");
        }
    } finally {
        await adminPool.end();
    }

    // Now connect to the actual database
    const pool = new Pool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });

    // Create feedbacks table if it doesn't exist
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS feedbacks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        message TEXT NOT NULL,
        rating INTEGER,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log("Feedbacks table created (or already exists)");
    } catch (err) {
        console.error("Error creating table:", err.message);
        throw err;
    }

    return pool;
}

module.exports = { init };