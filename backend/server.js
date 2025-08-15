const express = require("express");
const connectDB = require("./src/config/db");
const driverRoutes = require("./src/routes/driverRoutes");
const diagnosticRoutes = require("./src/routes/diagnosticRoutes");
const incidentRoutes = require("./src/routes/incidentRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/drivers", driverRoutes);
app.use("/api/diagnostics", diagnosticRoutes);
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
