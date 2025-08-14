const express = require("express");
const Diagnostic = require("../models/Diagnostic");
const router = express.Router();

// Add diagnostic record
router.post("/", async (req, res) => {
    try {
        const diagnostic = new Diagnostic(req.body);
        await diagnostic.save();
        res.status(201).json(diagnostic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all diagnostics
router.get("/", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find().populate("driver");
        res.json(diagnostics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
