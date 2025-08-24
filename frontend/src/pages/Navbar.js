import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import "../assets/styles/Navbar.css";

function Navbar({ onSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.startsWith("google_")) {
            setIsGoogleUser(true);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchQuery.trim());
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        if (isGoogleUser) {
            try {
                googleLogout();
            } catch (err) {
                console.warn("Google logout failed:", err);
            }
        }
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
                <form className="navbar-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>

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
            </div>
        </header>
    );
}

export default Navbar;
