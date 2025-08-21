const express = require("express");
const Diagnostic = require("../models/Diagnostic");

const router = express.Router();

// @route   POST /api/diagnostics
// @desc    Create new diagnostic record
router.post("/", async (req, res) => {
    try {
        const diagnostic = new Diagnostic(req.body);
        const saved = await diagnostic.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Error creating diagnostic:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /api/diagnostics
// @desc    Get all diagnostics
router.get("/", async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find().populate("driver");
        res.json(diagnostics);
    } catch (error) {
        console.error("Error fetching diagnostics:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /api/diagnostics/:id
// @desc    Get single diagnostic by ID
router.get("/:id", async (req, res) => {
    try {
        const diagnostic = await Diagnostic.findById(req.params.id).populate("driver");
        if (!diagnostic) return res.status(404).json({ message: "Not Found" });
        res.json(diagnostic);
    } catch (error) {
        console.error("Error fetching diagnostic:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   PUT /api/diagnostics/:id
// @desc    Update diagnostic by ID
router.put("/:id", async (req, res) => {
    try {
        const updated = await Diagnostic.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Not Found" });
        res.json(updated);
    } catch (error) {
        console.error("Error updating diagnostic:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   DELETE /api/diagnostics/:id
// @desc    Delete diagnostic by ID
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Diagnostic.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Diagnostic deleted" });
    } catch (error) {
        console.error("Error deleting diagnostic:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
