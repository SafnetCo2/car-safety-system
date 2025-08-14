const dotenv = require("dotenv");
dotenv.config(); // Load env first

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const path = require("path");

connectDB();

const app = express();

// Configure CORS only for development
if (process.env.NODE_ENV === "development") {
    const corsOptions = {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    };
    app.use(cors(corsOptions));
}

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

// Root endpoint
app.get("/", (req, res) => {
    res.send("🚗 Smart Car Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(
        `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
    )
);
