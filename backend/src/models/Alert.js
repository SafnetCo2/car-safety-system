const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    message: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
    isRead: { type: Boolean, default: false }, // track if user has seen the alert
    timestamp: { type: Date, default: Date.now }
});

// Optional: add a virtual for formatted timestamp
alertSchema.virtual("formattedTime").get(function () {
    return this.timestamp.toLocaleString();
});

module.exports = mongoose.model("Alert", alertSchema);
