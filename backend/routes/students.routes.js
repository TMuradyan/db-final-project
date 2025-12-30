const router = require("express").Router();
const pool = require("../db");

// CREATE
router.post("/", async (req, res) => {
  const {
    faculty_id,
    education_id,
    full_name,
    city,
    enrollment_year,
    birth_date,
  } = req.body;

  const result = await pool.query(
    `INSERT INTO students
     (faculty_id, education_id, full_name, city, enrollment_year, birth_date)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [faculty_id, education_id, full_name, city, enrollment_year, birth_date]
  );

  res.json(result.rows[0]);
});

// READ ALL (JOIN)
router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT s.student_id, s.full_name, s.city, s.enrollment_year,
           f.faculty_name,
           e.speciality
    FROM students s
    JOIN faculty f ON s.faculty_id = f.faculty_id
    JOIN education e ON s.education_id = e.education_id
  `);
  res.json(result.rows);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM students WHERE student_id=$1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM students WHERE student_id=$1", [req.params.id]);
  res.json({ message: "Student deleted" });
});

module.exports = router;
