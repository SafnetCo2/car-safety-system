const express = require("express");
const {
    addTelemetry,
    getTelemetryHistory
} = require("../controllers/telemetryController");

const router = express.Router();

router.post("/", addTelemetry);
router.get("/:vehicleId", getTelemetryHistory);

module.exports = router;
