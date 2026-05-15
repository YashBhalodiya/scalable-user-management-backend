const express = require("express");
const router = express.Router();
const { getActivitiesController } = require("../controller/activity.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Require authentication for all activity routes
router.use(authMiddleware.authenticateToken);

router.get("/", getActivitiesController);

module.exports = router;
