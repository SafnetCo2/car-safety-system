require("dotenv").config(); // Must be first
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

const driverRoutes = require("./src/routes/driverRoutes");
const diagnosticRoutes = require("./src/routes/diagnosticRoutes");
const incidentRoutes = require("./src/routes/incidentRoutes");
const authRoutes = require("./src/routes/authRoutes"); // <-- new auth routes

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/diagnostics", diagnosticRoutes);
app.use("/api/incidents", incidentRoutes);

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("JWT_SECRET =", process.env.JWT_SECRET); // check env loaded
});
