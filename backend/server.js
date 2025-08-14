const express = require("express");
const connectDB = require("./config/db");
const driverRoutes = require("./routes/driverRoutes");
const diagnosticRoutes = require("./routes/diagnosticRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/drivers", driverRoutes);
app.use("/api/diagnostics", diagnosticRoutes);
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
