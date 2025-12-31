const router = require("express").Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { speciality, scholarship_amount, group_number, year_ } = req.body;
  const result = await pool.query(
    `INSERT INTO education 
     (speciality, scholarship_amount, group_number, year_)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [speciality, scholarship_amount, group_number, year_]
  );
  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM education");
  res.json(result.rows);
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM education WHERE education_id=$1", [
    req.params.id,
  ]);
  res.json({ message: "Education deleted" });
});

module.exports = router;
