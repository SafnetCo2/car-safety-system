import React from "react";
import "../styles/Dashboard.css";
import KPISection from "../Dashboard/KPISection";
import MonitoringPanel from "../Dashboard/MonitoringPanel";
import ChartsSection from "../Dashboard/ChartsSection";
import IncidentsTable from "../Dashboard/IncidentsTable";
import QuickAction from "../Dashboard/QuickAction";

export default function Dashboard() {
    const kpiData = [
        { title: "Total Incidents", value: 120 },
        { title: "Critical Alerts", value: 8 },
        { title: "Resolved Cases", value: 95 },
        { title: "Pending Actions", value: 17 },
    ];

    const incidents = [
        { id: 1, type: "Collision", status: "Critical", date: "2025-08-15" },
        { id: 2, type: "Engine Fault", status: "Resolved", date: "2025-08-14" },
        { id: 3, type: "Overheating", status: "Pending", date: "2025-08-13" },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-body">
                <main className="dashboard-main">
                    <h2>Smart Car Safety Dashboard</h2>
                    <KPISection kpis={kpiData} />
                    <MonitoringPanel />
                    <ChartsSection />
                    <IncidentsTable incidents={incidents} />
                    <QuickAction />
                </main>
            </div>
        </div>
    );
}
