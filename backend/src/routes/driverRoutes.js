const express = require("express");
const Driver = require("../models/Driver");
const router = express.Router();

// Add driver
router.post("/", async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.status(201).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all drivers
router.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
