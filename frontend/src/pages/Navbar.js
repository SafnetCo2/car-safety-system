import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import "../assets/styles/Navbar.css";

function Navbar({ onSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [authType, setAuthType] = useState(null);
    const [suggestions, setSuggestions] = useState([]); // 🔹 Store suggestions

    const navigate = useNavigate();

    // 🔹 Example static data (replace with API if needed)
    const data = [
        "Driver Report",
        "Incident Log",
        "Vehicle Diagnostics",
        "Collision Alerts",
        "Speed Monitoring",
        "Weather Report",
        "Tire Pressure",
        "Battery Status",
        "Add Driver",
        "Settings",
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("authType");
        setLoggedIn(!!token);
        setAuthType(type);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchQuery.trim());
        setSuggestions([]); // Hide suggestions after search
    };

    // 🔹 Autocomplete logic
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.length > 0) {
            const filtered = data.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
        if (onSearch) onSearch(suggestion);
    };

    const handleLogout = () => {
        if (authType === "google") {
            try {
                googleLogout();
            } catch (err) {
                console.warn("Google logout failed:", err);
            }
        }
        localStorage.clear();
        setLoggedIn(false);
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1>🚗 Car Safety System</h1>
            </div>

            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
                {loggedIn ? (
                    <>
                        <form className="navbar-search" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleChange}
                            />
                            <button type="submit">🔍</button>
                        </form>

                        {/* 🔹 Autocomplete dropdown */}
                        {suggestions.length > 0 && (
                            <ul className="autocomplete-list">
                                {suggestions.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button className="btn-action">+ Add Driver</button>
                        <button className="btn-action">⚙ Settings</button>
                        <button className="btn-action logout" onClick={handleLogout}>
                            🔓 Logout
                        </button>

                        <div className="user-info">
                            <span>Welcome, Admin</span>
                            <img
                                src="https://via.placeholder.com/35"
                                alt="User"
                                className="user-avatar"
                            />
                        </div>
                    </>
                ) : (
                    <button
                        className="btn-action"
                        onClick={() => navigate("/login")}
                    >
                        🔑 Login
                    </button>
                )}
            </div>
        </header>
    );
}

export default Navbar;
