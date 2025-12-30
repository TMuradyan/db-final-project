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