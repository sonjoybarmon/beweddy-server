const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {

    res.send("Welcome Beweddy Server")
});






module.exports = router;