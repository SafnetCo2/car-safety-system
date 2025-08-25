import React, { useState } from "react";
import "../assets/styles/Sidebar.css";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [vehicleMenuOpen, setVehicleMenuOpen] = useState(false); // ✅ toggle submenu

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "✖" : "☰"}
            </button>

            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <h2 className="sidebar-title">🚗 Car Safety</h2>
                <nav>
                    <a href="/dashboard">📊 Dashboard</a>
                    <a href="/drivers">👥 Drivers</a>

                    {/* Vehicles with Submenu */}
                    <div className="sidebar-dropdown">
                        <button
                            className="dropdown-toggle"
                            onClick={() => setVehicleMenuOpen(!vehicleMenuOpen)}
                        >
                            🚘 Vehicles {vehicleMenuOpen ? "▲" : "▼"}
                        </button>
                        {vehicleMenuOpen && (
                            <div className="dropdown-menu">
                                <a href="/vehicles/form">➕ Vehicle Form</a>
                                <a href="/vehicles/list">📋 Vehicle List</a>
                            </div>
                        )}
                    </div>

                    <a href="/incidents">⚠️ Incidents</a>
                    <a href="/reports">📑 Reports</a>
                    <a href="/settings">⚙️ Settings</a>
                    <a href="/">🏠 Home</a>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
