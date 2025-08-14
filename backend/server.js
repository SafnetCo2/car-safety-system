const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/drivers", require("./src/routes/driverRoutes"));
app.use("/api/incidents", require("./src/routes/incidentRoutes"));
app.use("/api/diagnostics", require("./src/routes/diagnosticRoutes"));

app.get("/", (req, res) => {
    res.send("🚗 Smart Car Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
