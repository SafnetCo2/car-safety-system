const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// Configure CORS once
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Use deployed frontend URL in production
    credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/drivers", require("./src/routes/driverRoutes"));
app.use("/api/incidents", require("./src/routes/incidentRoutes"));
app.use("/api/diagnostics", require("./src/routes/diagnosticRoutes"));

// Root endpoint
app.get("/", (req, res) => {
    res.send("🚗 Smart Car Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`)
);
