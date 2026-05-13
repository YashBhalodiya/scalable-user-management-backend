const express = require("express");

const router = express.Router();

const {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware.authenticateToken, createUserController);
router.get("/:id", authMiddleware.authenticateToken, getUserByIdController);
router.put("/:id", authMiddleware.authenticateToken, updateUserController);
// DELETE should be admin-only
router.delete("/:id", authMiddleware.authenticateToken, authMiddleware.authorizedRole(['admin', 'user']), deleteUserController);

module.exports = router;
