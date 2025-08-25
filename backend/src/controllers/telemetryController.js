const Telemetry = require("../models/Telemetry");

// Add telemetry
const addTelemetry = async (req, res) => {
    try {
        const telemetry = await Telemetry.create(req.body);
        res.status(201).json(telemetry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get telemetry history for a vehicle
const getTelemetryHistory = async (req, res) => {
    try {
        const history = await Telemetry.find({ vehicle: req.params.vehicleId }).sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTelemetry, getTelemetryHistory };
