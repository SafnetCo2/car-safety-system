const mongoose = require("mongoose");

const diagnosticSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    batteryLevel: Number,
    tirePressure: Number,
    engineTemp: Number,
    notes: String
}, { timestamps: true });

module.exports = mongoose.models.Diagnostic || mongoose.model("Diagnostic", diagnosticSchema);
