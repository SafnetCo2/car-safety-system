// src/pages/Dashboard.jsx
import React from "react";
import "../assets/styles/Dashboard.css";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import KPISection from "../pages/Dashboard/KPISection";
import MonitoringPanel from "../pages/Dashboard/MonitoringPanel";
import ChartsSection from "../pages/Dashboard/ChartsSection";
import IncidentsTable from "../pages/Dashboard/IncidentsTable";
import QuickAction from "../pages/Dashboard/QuickActions";

export default function Dashboard() {
    // Mock KPI data
    const kpiData = [
        { title: "Total Incidents", value: 120 },
        { title: "Critical Alerts", value: 8 },
        { title: "Resolved Cases", value: 95 },
        { title: "Pending Actions", value: 17 },
    ];

    // Mock incidents table data
    const incidents = [
        { id: 1, type: "Collision", status: "Critical", date: "2025-08-15" },
        { id: 2, type: "Engine Fault", status: "Resolved", date: "2025-08-14" },
        { id: 3, type: "Overheating", status: "Pending", date: "2025-08-13" },
    ];

    // Mock chart data
    const chartData = [
        { name: "Jan", incidents: 30, resolved: 20 },
        { name: "Feb", incidents: 45, resolved: 35 },
        { name: "Mar", incidents: 60, resolved: 50 },
        { name: "Apr", incidents: 40, resolved: 38 },
        { name: "May", incidents: 70, resolved: 55 },
        { name: "Jun", incidents: 50, resolved: 48 },
    ];

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    return (
        <div className="dashboard-layout">
            <Navbar onSearch={handleSearch} />

            <div className="dashboard-content">
                <Sidebar />

                <main className="dashboard-main">
                    <h2>Smart Car Safety Dashboard</h2>
                    <KPISection kpis={kpiData} />
                    <MonitoringPanel />
                    {/* Pass chartData as prop */}
                    <ChartsSection data={chartData} />
                    <IncidentsTable incidents={incidents} />
                    <QuickAction />
                </main>
            </div>
        </div>
    );
}
