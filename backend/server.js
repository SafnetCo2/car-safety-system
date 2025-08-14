// server.js
const dotenv = require("dotenv");

// Load env variables first
dotenv.config();

// Remove DEBUG_URL if it exists (Render injects this automatically)
if (process.env.DEBUG_URL) {
    console.log("⚠️ Removing DEBUG_URL to prevent path-to-regexp crash");
    delete process.env.DEBUG_URL;
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const path = require("path");

// Connect to MongoDB
connectDB();

const app = express();

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// API Routes
app.use("/api/drivers", require("./src/routes/driverRoutes"));
app.use("/api/incidents", require("./src/routes/incidentRoutes"));
app.use("/api/diagnostics", require("./src/routes/diagnosticRoutes"));

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
    );
}

// Optional root endpoint
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
