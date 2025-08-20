import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";

function App() {
  const [refresh, setRefresh] = useState(0);

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
              <DriverForm onDriverAdded={() => setRefresh((prev) => prev + 1)} />
              <DriverList refresh={refresh} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
