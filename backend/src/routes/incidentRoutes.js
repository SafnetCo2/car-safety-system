const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");

// Create new incident
router.post("/", async (req, res) => {
    try {
        const newIncident = await Incident.create(req.body);
        res.status(201).json(newIncident);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all incidents
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get incidents for a specific driver
router.get("/driver/:driverId", async (req, res) => {
    try {
        const incidents = await Incident.find({ driver: req.params.driverId });
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update incident
router.put("/:id", async (req, res) => {
    try {
        const updatedIncident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedIncident);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete incident
router.delete("/:id", async (req, res) => {
    try {
        await Incident.findByIdAndDelete(req.params.id);
        res.json({ message: "Incident deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
