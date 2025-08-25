// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Manual signup handler
    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch(
                "https://car-safety-system.onrender.com/api/users/register", // direct backend URL
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                // Save token or user info in localStorage
                if (data.token) localStorage.setItem("token", data.token);
                if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

                setMessage("Account created successfully! Redirecting to dashboard...");
                setTimeout(() => navigate("/dashboard"), 1500); // Redirect to dashboard
            } else {
                setMessage(data.message || "Error creating account.");
            }
        } catch (error) {
            setMessage("Error signing up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google signup handler
    const handleGoogleSuccess = (credentialResponse) => {
        // You can send credentialResponse.credential to backend if needed
        setMessage("Google Sign-Up Successful! Redirecting to dashboard...");
        setLoading(true);

        // Simulate saving token
        localStorage.setItem("token", credentialResponse.credential || "google-demo-token");
        localStorage.setItem("user", JSON.stringify({ name: "Google User" }));

        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    const handleGoogleError = () => {
        setMessage("Google Sign-Up Failed. Please try again.");
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Create Account</h2>

                {/* Manual signup form */}
                <form className="driver-form" onSubmit={handleSignup} autoComplete="on">
                    <input
                        className="driver-input"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="driver-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="driver-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="driver-button" type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                {/* Google signup */}
                <div className="driver-google-login" style={{ marginTop: "15px", textAlign: "center" }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap={false}
                    />
                </div>

                <p className="driver-login-link" style={{ marginTop: "15px", textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link to="/login" className="driver-link">
                        Login here
                    </Link>
                </p>

                {/* Messages */}
                {message && (
                    <p
                        className={
                            message.toLowerCase().includes("success")
                                ? "driver-success show-message"
                                : "driver-error show-message"
                        }
                    >
                        {message}
                    </p>
                )}

                {/* Loading spinner */}
                {loading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Processing...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
