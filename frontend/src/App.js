import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import provider
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

function App() {
  const [refresh, setRefresh] = useState(0);
  const [newIncident, setNewIncident] = useState(null); // Track newly added incident

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} /> {/* Redirect root to Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

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
    </GoogleOAuthProvider>
  );
}

export default App;
