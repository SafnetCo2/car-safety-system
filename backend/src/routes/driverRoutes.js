const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

// GET all drivers
router.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET driver by ID
router.get("/:id", async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: "Driver not found" });
        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new driver
router.post("/", async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.status(201).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update driver
router.put("/:id", async (req, res) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedDriver) return res.status(404).json({ message: "Driver not found" });
        res.json(updatedDriver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE driver
router.delete("/:id", async (req, res) => {
    try {
        const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
        if (!deletedDriver) return res.status(404).json({ message: "Driver not found" });
        res.json({ message: "Driver deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
