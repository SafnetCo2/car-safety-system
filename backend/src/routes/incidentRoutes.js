const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");

// ✅ Create new incident
router.post("/", async (req, res) => {
    try {
        const { driver, type, location } = req.body;

        if (!driver || !type || !location) {
            return res.status(400).json({ message: "driver, type, and location are required" });
        }

        const newIncident = await Incident.create({ driver, type, location });
        res.status(201).json(newIncident);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ Get all incidents
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find().populate("driver");
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Get incident by ID
router.get("/:id", async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id).populate("driver");
        if (!incident) return res.status(404).json({ message: "Incident not found" });
        res.json(incident);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Get incidents for a specific driver
router.get("/driver/:driverId", async (req, res) => {
    try {
        const incidents = await Incident.find({ driver: req.params.driverId }).populate("driver");
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Update incident
router.put("/:id", async (req, res) => {
    try {
        const { type, location } = req.body;
        const updatedIncident = await Incident.findByIdAndUpdate(
            req.params.id,
            { type, location },
            { new: true, runValidators: true }
        );

        if (!updatedIncident) return res.status(404).json({ message: "Incident not found" });

        res.json(updatedIncident);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ Delete incident
router.delete("/:id", async (req, res) => {
    try {
        const deletedIncident = await Incident.findByIdAndDelete(req.params.id);
        if (!deletedIncident) return res.status(404).json({ message: "Incident not found" });

        res.json({ message: "Incident deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
