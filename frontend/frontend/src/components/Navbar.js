import React, { useState } from "react";
import "../assets/styles/Navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="navbar">
            {/* Left Branding */}
            <div className="navbar-left">
                <h1>🚗 Smart Car Safety System</h1>
            </div>

            {/* Mobile Menu Toggle */}
            <div
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ marginRight: "10px" }} // pushes toggle slightly to the right
            >
                ☰
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/reports">Reports</a></li>
                {isLoggedIn && (
                    <li>
                        <button
                            className="btn-action"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </header>
    );
}

export default Navbar;
