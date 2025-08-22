import React, { useEffect, useState } from "react";
import "../assets/styles/Dashboard.css";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import KPISection from "../pages/Dashboard/KPISection";
import MonitoringPanel from "../pages/Dashboard/MonitoringPanel";
import ChartsSection from "../pages/Dashboard/ChartsSection";
import IncidentsTable from "../pages/Dashboard/IncidentsTable";
import QuickAction from "../pages/Dashboard/QuickActions";

export default function Dashboard() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    // KPIs
    const kpiData = [
        { title: "Total Incidents", value: incidents.length },
        { title: "Critical Alerts", value: incidents.filter(i => i.type.includes("Collision")).length },
        { title: "Resolved Cases", value: 95 },
        { title: "Pending Actions", value: 17 },
    ];

    // Chart data
    const chartData = [
        { name: "Jan", incidents: 30, resolved: 20 },
        { name: "Feb", incidents: 45, resolved: 35 },
        { name: "Mar", incidents: 60, resolved: 50 },
        { name: "Apr", incidents: 40, resolved: 38 },
        { name: "May", incidents: 70, resolved: 55 },
        { name: "Jun", incidents: 50, resolved: 48 },
    ];

    // Fetch incidents
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const res = await fetch("https://car-safety-system.onrender.com/api/incidents");
                const data = await res.json();
                setIncidents(data);
            } catch (err) {
                console.error("Error fetching incidents:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

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
                    <ChartsSection data={chartData} />

                    {loading ? (
                        <p>Loading incidents...</p>
                    ) : (
                        <IncidentsTable incidents={incidents} />
                    )}

                    <QuickAction />
                </main>
            </div>
        </div>
    );
}
