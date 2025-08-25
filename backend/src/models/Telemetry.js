const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    speed: Number,
    rpm: Number,
    tirePressure: Number,
    battery: Number,
    brakeStatus: Boolean,
    fuelLevel: Number,
    gps: {
        lat: Number,
        lng: Number
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Telemetry", telemetrySchema);
