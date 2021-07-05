const express = require("express");
const router = express.Router();

//controller
const profileController = require("../Controllers/profileController");

//authentication middleware
const { protect } = require("../common-middleware/index");
//validation middleware
const {
  checkProfile,
  profileValidationResult,
} = require("../validators/profileValidators");

// router.post("/", [protect, checkProfile, profileValidationResult], profileController.create);
router.post("/", protect, profileController.create);
router.get("/:slug", protect, profileController.getSingle);

router.get("/dashboard/:profileId", profileController.getDashboardDetailsById);
router.get(
  "/dashboard/getDashboardAllData",
  profileController.getDashboardAllData
);

module.exports = router;
