const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

// Create new driver
router.post("/", async (req, res) => {
    try {
        const newDriver = await Driver.create(req.body);
        res.status(201).json(newDriver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all drivers
router.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get driver by ID
router.get("/:id", async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: "Driver not found" });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update driver
router.put("/:id", async (req, res) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDriver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete driver
router.delete("/:id", async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ message: "Driver deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
