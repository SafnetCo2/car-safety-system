// server.js
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables first
delete process.env.DEBUG_URL; // Remove DEBUG_URL to prevent Render crash

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const path = require("path");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));

// API Routes (relative paths only!)
app.use("/api/drivers", require("./src/routes/driverRoutes"));
app.use("/api/incidents", require("./src/routes/incidentRoutes"));
app.use("/api/diagnostics", require("./src/routes/diagnosticRoutes"));

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    const frontendBuildPath = path.join(__dirname, "../frontend/build");
    app.use(express.static(frontendBuildPath));

    // All unmatched routes go to React frontend
    app.get("*", (req, res) =>
        res.sendFile(path.join(frontendBuildPath, "index.html"))
    );
}

// Optional root endpoint for local development
app.get("/", (req, res) => {
    res.send("🚗 Smart Car Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
    );
});
