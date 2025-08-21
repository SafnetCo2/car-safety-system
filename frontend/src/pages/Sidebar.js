import React, { useState } from "react";
import "../assets/styles/Sidebar.css";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

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
                    <a href="/vehicles">🚘 Vehicles</a>
                    
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
