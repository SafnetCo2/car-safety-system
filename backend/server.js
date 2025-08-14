const dotenv = require("dotenv");
dotenv.config(); // must be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const path = require("path");

connectDB();

const app = express(); // <-- define app before using middleware

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/drivers", require("./src/routes/driverRoutes"));
app.use("/api/incidents", require("./src/routes/incidentRoutes"));
app.use("/api/diagnostics", require("./src/routes/diagnosticRoutes"));

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

// Root endpoint (optional, mostly for local dev)
app.get("/", (req, res) => {
    res.send("🚗 Smart Car Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
