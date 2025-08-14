const express = require("express");
const Incident = require("../models/Incident");
const router = express.Router();

// Add incident
router.post("/", async (req, res) => {
    try {
        const incident = new Incident(req.body);
        await incident.save();
        res.status(201).json(incident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all incidents
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find().populate("driver");
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
