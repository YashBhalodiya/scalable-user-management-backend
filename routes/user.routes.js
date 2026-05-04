const express = require("express");

const router = express.Router();

const {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require("../controller/user.controller");

router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

module.exports = router;
