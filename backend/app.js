const express = require("express");
const cors = require("cors");

const facultyRoutes = require("./routes/faculty.routes");
const educationRoutes = require("./routes/education.routes");
const studentsRoutes = require("./routes/students.routes");
const studentsJsonRoutes = require("./routes/students.json.routes"); 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/faculties", facultyRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/students", studentsJsonRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
