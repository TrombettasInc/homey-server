
const Project = require("../models/Project.model");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


// GET /api/health
router.get('/health', (req, res) => {

  // send DB request to keep it alive
  Project.find().then().catch();

  // send success response
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});



module.exports = router;
