const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./cholesterol/cholesterol");
const heartRate = require("./heartRate/heartRate");

// API Routes
router.use("/api/cholesterol/", apiRoutes);
router.use("/api/heartrate/", heartRate);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log('/');
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;