import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";
import VehicleForm from "./components/VehicleForm"; // ✅ new import
import VehicleList from "./components/VehicleList"; // ✅ new import
import DriverDiagnostics from "./components/DriverDiagnostics";
import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";
import Signup from "./pages/Signup";

function App() {
  const [refreshDrivers, setRefreshDrivers] = useState(0);
  const [newIncident, setNewIncident] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Drivers page */}
        <Route
          path="/drivers"
          element={
            <ProtectedRoute>
              <>
                <DriverForm onDriverAdded={() => setRefreshDrivers(prev => prev + 1)} />
                <DriverList refresh={refreshDrivers} />
              </>
            </ProtectedRoute>
          }
        />

        {/* Vehicles pages separated */}
        <Route
          path="/vehicles/form"
          element={
            <ProtectedRoute>
              <VehicleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/list"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        {/* Diagnostics */}
        <Route
          path="/diagnostics/:driverId"
          element={
            <ProtectedRoute>
              <DriverDiagnostics />
            </ProtectedRoute>
          }
        />

        {/* Incidents page */}
        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <>
                <IncidentForm onIncidentAdded={(incident) => setNewIncident(incident)} />
                <IncidentList newManualIncident={newIncident} />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
