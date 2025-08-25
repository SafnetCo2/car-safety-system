import React, { useEffect, useState } from "react";
import "../assets/styles/Dashboard.css";

export default function AlertStack({ vehicleId }) {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch(`https://car-safety-system.onrender.com/api/alerts?vehicle=${vehicleId}`);
                // Safety check: parse JSON only if content-type is JSON
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    setAlerts(data);
                } else {
                    const text = await res.text();
                    console.error("Unexpected response (not JSON):", text);
                }
            } catch (err) {
                console.error("Error fetching alerts:", err);
            }
        };

        fetchAlerts();

        // Optional: poll every 10s
        const interval = setInterval(fetchAlerts, 10000);
        return () => clearInterval(interval);
    }, [vehicleId]);

    const dismissAlert = (index) => {
        setAlerts((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="alert-stack">
            {alerts.map((alert, i) => (
                <div key={i} className={`driver-error`}>
                    <p>{alert.message} ({alert.severity})</p>
                    <button onClick={() => dismissAlert(i)}>✖</button>
                </div>
            ))}
        </div>
    );
}
