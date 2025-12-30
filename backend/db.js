const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Smile2003$", // <-- свой пароль
  host: "localhost",
  port: 5432,
  database: "FinalProject",
});

module.exports = pool;
