const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
