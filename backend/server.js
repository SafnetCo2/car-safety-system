require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

const driverRoutes = require("./src/routes/driverRoutes");
const diagnosticRoutes = require("./src/routes/diagnosticRoutes");
const incidentRoutes = require("./src/routes/incidentRoutes");

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// ✅ API routes
app.use("/api/drivers", driverRoutes);
app.use("/api/diagnostics", diagnosticRoutes);
app.use("/api/incidents", incidentRoutes);

// ✅ Serve React build (correct path)
app.use(express.static(path.join(__dirname, "../frontend/frontend/build")));

// ✅ Catch-all for React Router (Express 5 safe)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/frontend/build", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
