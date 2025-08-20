const express = require("express");
const router = express.Router();
const Diagnostic = require("../models/Diagnostic");

// ✅ GET all diagnostics
router.get("/", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find().populate("driver");
        res.json(diagnostics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/driver/:driverId", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find({ driver: req.params.driverId }).populate("driver");
        res.json(diagnostics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ✅ GET single diagnostic by ID
router.get("/:id", async (req, res) => {
    try {
        const diagnostic = await Diagnostic.findById(req.params.id).populate("driver");
        if (!diagnostic) return res.status(404).json({ message: "Diagnostic not found" });
        res.json(diagnostic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ POST new diagnostic
router.post("/", async (req, res) => {
    try {
        const diagnostic = new Diagnostic(req.body);
        await diagnostic.save();
        res.status(201).json(diagnostic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ PUT update diagnostic
router.put("/:id", async (req, res) => {
    try {
        const updated = await Diagnostic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Diagnostic not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ DELETE diagnostic
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Diagnostic.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Diagnostic not found" });
        res.json({ message: "Diagnostic deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
