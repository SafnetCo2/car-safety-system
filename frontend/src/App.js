import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";
import DriverDiagnostics from "./components/DriverDiagnostics";
import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";
import Signup from "./pages/Signup";

function App() {
  const [refresh, setRefresh] = useState(0);
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
        <Route
          path="/drivers"
          element={
            <ProtectedRoute>
              <>
                <DriverForm onDriverAdded={() => setRefresh((prev) => prev + 1)} />
                <DriverList refresh={refresh} />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/diagnostics/:driverId"
          element={
            <ProtectedRoute>
              <DriverDiagnostics />
            </ProtectedRoute>
          }
        />
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
