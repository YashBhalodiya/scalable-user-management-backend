const pool = require("../db/db");
const ActivityService = require("./activity.service");

async function createUser(name, email, password, role) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *",
    [name, email, password, role],
  );
  const newUser = result.rows[0];
  await ActivityService.logAction(newUser.id, 'CREATE', newUser.id, {new_data: newUser})
  return newUser
}

// finding user by ID
async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

// finding user by email
async function getUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

async function updateUser(id, name) {
  const result = await pool.query(
    "UPDATE users SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [name, id],
  );
  const updatedUser = result.rows[0];
  await ActivityService.logAction(updatedUser.id, 'UPDATE', { 
    old_data: previousUser, 
    new_data: updatedUser 
  });
  return updatedUser;
}

async function deleteUser(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  const oldUser = result.rows[0];
  await ActivityService.logAction(oldUser.id, 'DELETE', { deleted_data: oldUser });
  return result.rows[0];
}

module.exports = { createUser, getUserById, getUserByEmail, updateUser, deleteUser };
