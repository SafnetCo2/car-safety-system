const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vin: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    fuelType: { type: String, required: true },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);



