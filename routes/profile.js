const express = require("express");
const { protect } = require("../common-middleware");
const router = express.Router();

//controller
const profileController = require("../Controllers/profileController");


router.post("/", profileController.create);
router.get("/dashboard/:slug", profileController.getDashboardBySlug);
router.get("/dashboard/:profileId", profileController.getDashboardDetailsById);
router.get("/dashboard/getDashboardAllData", profileController.getDashboardAllData);




module.exports = router;