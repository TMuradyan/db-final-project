const axios = require("axios");
const { faker } = require("@faker-js/faker");

const API_URL = "http://localhost:3000/api";

const NUM_FACULTIES = 20;
const NUM_EDUCATIONS = 100;
const NUM_STUDENTS = 10000;

// Создание факультетов
async function createFaculties() {
  const faculties = [];
  for (let i = 0; i < NUM_FACULTIES; i++) {
    const data = {
      faculty_name: faker.word.noun() + " Faculty",
      dean: faker.person.fullName(),
      places_count: faker.number.int({ min: 50, max: 500 }),
    };
    const res = await axios.post(`${API_URL}/faculties`, data);
    faculties.push(res.data);
  }
  return faculties;
}

// Создание специальностей
async function createEducations() {
  const educations = [];
  for (let i = 0; i < NUM_EDUCATIONS; i++) {
    const data = {
      speciality: faker.word.noun() + " Speciality",
      scholarship_amount: faker.number.int({ min: 0, max: 2000 }),
      group_number: faker.number.int({ min: 1, max: 20 }),
      year_: faker.number.int({ min: 1, max: 4 }),
    };
    const res = await axios.post(`${API_URL}/educations`, data);
    educations.push(res.data);
  }
  return educations;
}

// Создание студентов
async function createStudents(faculties, educations) {
  for (let i = 0; i < NUM_STUDENTS; i++) {
    const faculty = faculties[Math.floor(Math.random() * faculties.length)];
    const education = educations[Math.floor(Math.random() * educations.length)];

    const data = {
      full_name: faker.person.fullName(),
      city: faker.location.city(),
      enrollment_year: faker.number.int({ min: 2018, max: 2025 }),
      birth_date: faker.date.birthdate({ min: 18, max: 25, mode: "age" }),
      faculty_id: faculty.faculty_id,
      education_id: education.education_id,
    };

    await axios.post(`${API_URL}/students`, data);

    if ((i + 1) % 100 === 0) {
      console.log(`${i + 1} студентов создано...`);
    }
  }
}

// Главная функция
async function main() {
  try {
    console.log("Создаём факультеты...");
    const faculties = await createFaculties();
    console.log("Факультеты созданы:", faculties.length);

    console.log("Создаём специальности...");
    const educations = await createEducations();
    console.log("Специальности созданы:", educations.length);

    console.log("Создаём студентов...");
    await createStudents(faculties, educations);
    console.log("Студенты созданы:", NUM_STUDENTS);

    console.log("База данных заполнена успешно!");
  } catch (error) {
    console.error("Ошибка при заполнении базы данных:", error.message);
  }
}

main();
