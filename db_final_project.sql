CREATE TABLE faculty (
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(50) NOT NULL,
    dean VARCHAR(50),
    places_count SMALLINT
);

CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    speciality VARCHAR(30) NOT NULL,
    scholarship_amount INT ,
    group_number SMALLINT,
    year_ SMALLINT
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    faculty_id INT REFERENCES faculty(faculty_id),
    education_id INT REFERENCES education(education_id),
    full_name VARCHAR(50) NOT NULL,
    city VARCHAR(30),
    enrollment_year SMALLINT,
    birth_date DATE
);

CREATE INDEX idx_students_faculty ON students(faculty_id);
CREATE INDEX idx_students_education ON students(education_id);

ALTER TABLE students
ADD COLUMN email VARCHAR(100);

CREATE INDEX idx_students_enrollment_year
ON students(enrollment_year);

CREATE OR REPLACE VIEW students_filtered_view AS
SELECT *
FROM students
WHERE faculty_id IS NOT NULL AND enrollment_year IS NOT NULL;


CREATE OR REPLACE VIEW students_joined_view AS
SELECT s.student_id, s.full_name, s.enrollment_year, s.city,
       f.faculty_name, e.speciality
FROM students s
JOIN faculty f ON s.faculty_id = f.faculty_id
JOIN education e ON s.education_id = e.education_id;

CREATE OR REPLACE VIEW students_count_by_faculty_view AS
SELECT faculty_id, COUNT(*) AS students_count
FROM students
GROUP BY faculty_id;


CREATE OR REPLACE VIEW students_sorted_view AS
SELECT *
FROM students
ORDER BY full_name;


UPDATE education
SET scholarship_amount = scholarship_amount * 1.1
WHERE education_id IN (
    SELECT education_id FROM students
    WHERE faculty_id = 2 AND enrollment_year <= 2021
);

ALTER TABLE students
ADD COLUMN additional_info JSONB;


UPDATE students
SET additional_info = jsonb_build_object(
  'hobbies', jsonb_build_array('football', 'chess', 'reading'),
  'skills', jsonb_build_array('JavaScript', 'SQL', 'Node.js'),
  'notes', 'Отличный студент, активно участвует в мероприятиях'
)
WHERE student_id <= 10; 


CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX idx_students_additional_info_trgm
ON students
USING GIN ((additional_info::text) gin_trgm_ops);