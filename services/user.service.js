const pool = require("../db/db");

async function createUser(name, email) {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES($1, $2) RETURNING *",
    [name, email],
  );
  return result.rows[0];
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

async function updateUser(id, name) {
  const result = await pool.query(
    "UPDATE users SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [name, id],
  );
  return result.rows[0];
}

async function deleteUser(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}

module.exports = { createUser, getUserById, updateUser, deleteUser };
