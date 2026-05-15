const pool = require("../db/db");

async function logActivity(userId, action, details = {}, ipAddress = null) {
  try {
    const result = await pool.query(
      "INSERT INTO activities (user_id, action, details, ip_address) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, action, details, ipAddress]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error logging activity manually:", error);
  }
}

async function getUserActivities(userId, page = 1, limit = 10) {
  const currentLimit = parseInt(limit, 10);
  const currentOffset = (parseInt(page, 10) - 1) * currentLimit;

  const result = await pool.query(
    "SELECT * FROM activities WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
    [userId, currentLimit, currentOffset]
  );
  
  const countResult = await pool.query(
    "SELECT COUNT(*) FROM activities WHERE user_id = $1",
    [userId]
  );

  return {
    activities: result.rows,
    totalCount: parseInt(countResult.rows[0].count, 10),
    totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / currentLimit),
    currentPage: parseInt(page, 10)
  };
}

module.exports = {
  logActivity,
  getUserActivities
};
