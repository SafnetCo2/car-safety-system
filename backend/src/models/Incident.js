const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.Incident || mongoose.model("Incident", incidentSchema);
