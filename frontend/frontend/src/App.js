import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/drivers"
          element={
            <>
              <DriverForm />
              <DriverList />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
