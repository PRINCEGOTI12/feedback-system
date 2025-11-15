const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
const DB_NAME = process.env.DB_NAME || "feedback system";

async function init() {
    // connect without database to ensure the database exists
    let conn;
    try {
        conn = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            multipleStatements: true,
        });
    } catch (err) {
        console.error("Failed to connect to MySQL using", {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
        });
        console.error("Error:", err.message || err);
        throw new Error(
            "Unable to connect to MySQL. Ensure MySQL is running and credentials in .env are correct."
        );
    }

    // Create database if not exists (use backticks to allow spaces if provided)
    // For hosted databases (PlanetScale, etc.), the database usually exists
    try {
        const createDbSQL = "CREATE DATABASE IF NOT EXISTS `" + DB_NAME + "`";
        await conn.query(createDbSQL);
    } catch (err) {
        // Hosted databases may not allow CREATE DATABASE; skip silently
        console.log(
            "Note: Could not create database (likely hosted DB). Continuing..."
        );
    }

    // Use the database
    const useDbSQL = "USE `" + DB_NAME + "`";
    await conn.query(useDbSQL);

    // Create table if not exists
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS \`feedbacks\` (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      message TEXT NOT NULL,
      rating TINYINT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;

    await conn.query(createTableSQL);
    await conn.end();

    // create and return a pool connected to the database
    const pool = mysql.createPool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    return pool;
}

module.exports = { init };