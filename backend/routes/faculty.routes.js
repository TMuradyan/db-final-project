const router = require("express").Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { faculty_name, dean, places_count } = req.body;
  const result = await pool.query(
    "INSERT INTO faculty (faculty_name, dean, places_count) VALUES ($1,$2,$3) RETURNING *",
    [faculty_name, dean, places_count]
  );
  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM faculty");
  res.json(result.rows);
});

router.get("/:id", async (req, res) => {
  const result = await pool.query("SELECT * FROM faculty WHERE faculty_id=$1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const { faculty_name, dean, places_count } = req.body;
  const result = await pool.query(
    `UPDATE faculty SET faculty_name=$1, dean=$2, places_count=$3
     WHERE faculty_id=$4 RETURNING *`,
    [faculty_name, dean, places_count, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM faculty WHERE faculty_id=$1", [req.params.id]);
  res.json({ message: "Faculty deleted" });
});

module.exports = router;
