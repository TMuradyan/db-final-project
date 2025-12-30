const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/api/view/students-filtered", async (req, res) => {
  const { faculty_id, enrollment_year } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM students_filtered_view WHERE faculty_id = $1 AND enrollment_year = $2`,
      [faculty_id, enrollment_year]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/view/students-joined", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM students_joined_view`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/view/students-count-by-faculty", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM students_count_by_faculty_view`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/view/students-sorted", async (req, res) => {
  const { sort_by = "full_name", order = "ASC" } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM students_sorted_view ORDER BY ${sort_by} ${order}`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
