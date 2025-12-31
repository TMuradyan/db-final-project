const fs = require("fs");
const path = require("path");
const pool = require("./db");

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      await pool.query(sql);
      console.log(`Применена миграция: ${file}`);
    }

    console.log("Все миграции успешно применены!");
    process.exit(0);
  } catch (err) {
    console.error("Ошибка при применении миграций:", err.message);
    process.exit(1);
  }
}

runMigrations();
