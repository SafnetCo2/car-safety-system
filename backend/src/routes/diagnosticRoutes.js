const express = require("express");
const router = express.Router();
const Diagnostic = require("../models/Diagnostic");

// Create new diagnostic record
router.post("/", async (req, res) => {
    try {
        const newDiagnostic = await Diagnostic.create(req.body);
        res.status(201).json(newDiagnostic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all diagnostics
router.get("/", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find();
        res.json(diagnostics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get diagnostics for a specific driver
router.get("/driver/:driverId", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find({ driver: req.params.driverId });
        res.json(diagnostics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get diagnostics for a specific vehicle
router.get("/vehicle/:vehicleId", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find({ "vehicleData.vehicleId": req.params.vehicleId });
        res.json(diagnostics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update diagnostic record
router.put("/:id", async (req, res) => {
    try {
        const updatedDiagnostic = await Diagnostic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDiagnostic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete diagnostic record
router.delete("/:id", async (req, res) => {
    try {
        await Diagnostic.findByIdAndDelete(req.params.id);
        res.json({ message: "Diagnostic record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
