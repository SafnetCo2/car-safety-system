const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    vin: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    fuelType: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
