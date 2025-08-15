import React, { useState } from "react";
import "../assets/styles/Navbar.css";

function Navbar({ onSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery.trim()); // Pass the search value to the parent
        }
    };

    return (
        <header className="navbar">
            {/* Left Branding */}
            <div className="navbar-left">
                <h1>🚗 Car Safety System</h1>
            </div>

            {/* Mobile Menu Toggle */}
            <div
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            {/* Right Actions */}
            <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
                {/* Search Bar */}
                <form className="navbar-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>

                {/* Action Buttons */}
                <button className="btn-action">+ Add Driver</button>
                <button className="btn-action">⚙ Settings</button>

                {/* User Info */}
                <div className="user-info">
                    <span>Welcome, Admin</span>
                    <img
                        src="https://via.placeholder.com/35"
                        alt="User"
                        className="user-avatar"
                    />
                </div>
            </div>
        </header>
    );
}

export default Navbar;
