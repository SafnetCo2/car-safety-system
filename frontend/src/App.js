import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";
import DriverDiagnostics from "./components/DriverDiagnostics";
import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [newIncident, setNewIncident] = useState(null); // Track newly added incident

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />

        {/* Drivers page */}
        <Route
          path="/drivers"
          element={
            <>
              <DriverForm onDriverAdded={() => setRefresh((prev) => prev + 1)} />
              <DriverList refresh={refresh} />
            </>
          }
        />

        {/* Diagnostics page */}
        <Route
          path="/diagnostics/:driverId"
          element={<DriverDiagnostics />}
        />

        {/* Incidents page */}
        <Route
          path="/incidents"
          element={
            <>
              {/* Form to log new incidents */}
              <IncidentForm onIncidentAdded={(incident) => setNewIncident(incident)} />

              {/* List all incidents with live updates */}
              <IncidentList newManualIncident={newIncident} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
