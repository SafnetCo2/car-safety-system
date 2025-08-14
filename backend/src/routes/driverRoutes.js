const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

router.get("/", async (req, res) => {
    const drivers = await Driver.find();
    res.json(drivers);
});

router.post("/", async (req, res) => {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
});

module.exports = router;
