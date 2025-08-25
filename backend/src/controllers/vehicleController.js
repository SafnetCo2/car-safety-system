const Vehicle = require("../models/Vehicle");

// Create vehicle
const createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all vehicles
const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate("assignedDriver", "name email");
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one vehicle
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate("assignedDriver", "name email");
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update vehicle
const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete vehicle
const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json({ message: "Vehicle deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};
