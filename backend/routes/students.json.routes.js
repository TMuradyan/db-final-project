const express = require("express");
const pool = require("../db"); 
const router = express.Router();

router.get("/search-json", async (req, res) => {
  const { q } = req.query; 
  if (!q) return res.status(400).json({ error: "Параметр q обязателен" });

  try {
    const result = await pool.query(
      `SELECT * FROM students WHERE additional_info::text ~* $1`,
      [q]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
