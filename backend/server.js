require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const driverRoutes = require("./src/routes/driverRoutes");
const diagnosticRoutes = require("./src/routes/diagnosticRoutes");
const incidentRoutes = require("./src/routes/incidentRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration: allow all origins temporarily for testing
// You can restrict later to your frontend URLs
app.use(cors({
    origin: '*', // allow all origins temporarily
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// API routes
app.use("/api/drivers", driverRoutes);
app.use("/api/diagnostics", diagnosticRoutes);
app.use("/api/incidents", incidentRoutes);

// Health check route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
