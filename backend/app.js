const express = require("express");
const cors = require("cors");

const facultyRoutes = require("./routes/faculty.routes");
const educationRoutes = require("./routes/education.routes");
const studentsRoutes = require("./routes/students.routes"); // 👈 ВАЖНО: students

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/faculties", facultyRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/students", studentsRoutes);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
