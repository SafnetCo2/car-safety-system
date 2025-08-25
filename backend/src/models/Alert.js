const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    message: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
