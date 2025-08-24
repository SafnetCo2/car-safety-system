// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setMessage(
                " Password must be at least 6 characters, include 1 uppercase and 1 special character"
            );
            return;
        }

        try {
            const res = await fetch(
                "https://car-safety-system.onrender.com/api/users/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                setMessage(" Login successful!");
                navigate("/dashboard");
            } else {
                setMessage(data.message || "Invalid email or password");
            }
        } catch (error) {
            setMessage("Error logging in. Please try again.");
        }
    };

    // Google login success
    const handleGoogleSuccess = async (credentialResponse) => {
        console.log("Google credential:", credentialResponse.credential);
        // You can send credentialResponse.credential to backend to login/register user
        setMessage("Logged in with Google!");
        navigate("/dashboard");
    };

    const handleGoogleError = () => {
        setMessage(" Google login failed. Please try again.");
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Login</h2>
                <form className="driver-form" onSubmit={handleLogin}>
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
                    <button className="driver-button" type="submit">
                        Login
                    </button>
                </form>

                <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <p>Or login with Google:</p>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                    />
                </div>

                {message && (
                    <p
                        className={
                            message.includes("")
                                ? "driver-success show-message"
                                : "driver-error show-message"
                        }
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
