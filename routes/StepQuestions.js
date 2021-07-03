const express = require("express");
const { requireSignin } = require("../common-middleware");
const { createWeddyProfile, getDashboardBySlug, getDashboardDetailsById, getDashboardAllData } = require("../Controllers/StepQuestions");
const router = express.Router();

router.post(
    "/dashboard/createQuestions",
    createWeddyProfile
);
router.get("/dashboard/:slug", getDashboardBySlug);
router.get("/dashboard/:profileId", getDashboardDetailsById);
router.get("/dashboard/getDashboardAllData", getDashboardAllData);

module.exports = router;
