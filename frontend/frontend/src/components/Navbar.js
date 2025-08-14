import React from "react";


function Navbar() {
    return (
        <nav className="navbar">
            <h1>🚗 Smart Car Safety System</h1>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/reports">Reports</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
