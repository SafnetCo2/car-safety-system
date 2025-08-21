import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/Home.css"; // just for home-specific styles
import "../assets/styles/Navbar.css"; // navbar styles shared with dashboard

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "password") {
            setIsLoggedIn(true);
            setEmail("");
            setPassword("");
        } else {
            alert("Invalid credentials");
        }
    };

    const handleLogout = () => setIsLoggedIn(false);

    return (
        <div className="home-page">
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            <main className="home-content">
                {!isLoggedIn ? (
                    <div className="login-form-container">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin} className="login-form">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                ) : (
                    <div className="welcome-message">
                        <h2>Welcome Back, Admin!</h2>
                        <p>You are logged in. Explore the dashboard and manage your system.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Home;
