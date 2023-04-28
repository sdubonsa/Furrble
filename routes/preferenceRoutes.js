const express = require("express");
const controller = require("../controllers/preferenceController");
const router = express.Router();

// post /preferences: Add preference
router.post("/", controller.addPreference);

router.put("/", controller.updatePreference);

module.exports = router;