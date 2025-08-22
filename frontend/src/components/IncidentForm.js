import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IncidentForm({ onIncidentAdded, onLogout }) {
    const [driver, setDriver] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate(); // React Router navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(
                "https://car-safety-system.onrender.com/api/incidents",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ driver, type, location }),
                }
            );

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to log incident");
            }

            const data = await res.json();
            onIncidentAdded && onIncidentAdded(data);

            setDriver("");
            setType("");
            setLocation("");
            setSuccess("Incident logged successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear any user-related data if needed
        localStorage.removeItem("token"); // optional
        onLogout && onLogout();           // call parent logout handler
        navigate("/dashboard");           // redirect to Dashboard
    };

    // Auto-fade messages after 3 seconds
    useEffect(() => {
        let timer;
        if (success || error) {
            timer = setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [success, error]);

    return (
        <div className="incident-form">
            <div className="incident-form-card">
                <h1 className="incident-form-main-title">🚨 Incident Reporting</h1>
                <h3 className="incident-form-title">Log New Incident</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Driver ID"
                        value={driver}
                        onChange={(e) => {
                            setDriver(e.target.value);
                            setError(null);
                            setSuccess(null);
                        }}
                        className="incident-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Incident Type (e.g., Collision Warning)"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            setError(null);
                            setSuccess(null);
                        }}
                        className="incident-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            setError(null);
                            setSuccess(null);
                        }}
                        className="incident-input"
                        required
                    />
                    <button type="submit" disabled={loading} className="incident-button">
                        {loading ? "Logging..." : "Log Incident"}
                    </button>
                    <button
                        type="button"
                        className="incident-button logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </form>

                {error && <p className="incident-error show-message">{error}</p>}
                {success && <p className="incident-success show-message">{success}</p>}
            </div>
        </div>
    );
}
