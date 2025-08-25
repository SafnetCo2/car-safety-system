// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // ✅ Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setMessage("Password must be 6+ characters, include 1 uppercase & 1 special character.");
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setMessage(data.message || "Invalid email or password");
            }
        } catch {
            setMessage("Error logging in. Please try again.");
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google User:", decoded);

            localStorage.setItem("token", credentialResponse.credential);
            localStorage.setItem("googleUser", JSON.stringify(decoded));

            setMessage("Logged in with Google!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Google token decode error:", error);
            setMessage("Error logging in with Google.");
        }
    };

    const handleGoogleError = () => {
        setMessage("Google login failed. Please try again.");
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Login</h2>
                <form className="driver-form" onSubmit={handleLogin} autoComplete="on">
                    <input
                        className="driver-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                    <input
                        className="driver-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <button className="driver-button" type="submit">Login</button>
                </form>

                <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <p>Or login with Google:</p>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap={false}      // Disable auto-login
                        ux_mode="popup"       // Use popup for login
                        auto_select={false}   //  Always ask which account
                        prompt="select_account" // Force selection prompt
                    />
                </div>

                {message && (
                    <p className={message.includes("success") ? "driver-success" : "driver-error"}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
