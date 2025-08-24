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
                setMessage("Login successful!");
                navigate("/dashboard");
            } else {
                setMessage(data.message || "Invalid email or password");
            }
        } catch {
            setMessage("Error logging in. Please try again.");
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        localStorage.setItem("token", credentialResponse.credential);
        setMessage("Logged in with Google!");
        navigate("/dashboard");
    };

    const handleGoogleError = () => {
        setMessage("Google login failed. Please try again.");
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
                    <button className="driver-button" type="submit">Login</button>
                </form>

                <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <p>Or login with Google:</p>
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                </div>

                {message && (
                    <p className={message.includes("successful") ? "driver-success" : "driver-error"}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
