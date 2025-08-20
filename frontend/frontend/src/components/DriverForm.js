import React, { useState, useEffect } from "react";
import "../assets/styles/styles.css";

import API_BASE_URL from "../config"; // adjust path if needed

function DriverForm({ onDriverAdded }) {
    const [drivers, setDrivers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        licenseNumber: "",
        vehicleType: "",
        vin: "",
        model: "",
        year: "",
        fuelType: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/drivers`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
            setMessage("❌ Failed to load drivers");
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // ✅ Remove empty fields before sending
            const cleanData = Object.fromEntries(
                Object.entries(formData).filter(([_, v]) => v && v.trim() !== "")
            );

            const res = await fetch(`${API_BASE_URL}/drivers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData),
            });

            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();

            setMessage("✅ Driver added successfully!");
            setFormData({
                name: "",
                licenseNumber: "",
                vehicleType: "",
                vin: "",
                model: "",
                year: "",
                fuelType: "",
            });

            fetchDrivers();
            if (onDriverAdded) onDriverAdded(data);
        } catch (error) {
            console.error("Error adding driver:", error);
            setMessage("❌ Failed to add driver");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Add Driver & Vehicle</h2>
                <form onSubmit={handleSubmit} className="driver-form">
                    {Object.keys(formData).map((field) => (
                        <input
                            key={field}
                            name={field}
                            placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                            value={formData[field]}
                            onChange={handleChange}
                            required={["name", "licenseNumber", "vehicleType"].includes(field)} // only require core fields
                            className="driver-input"
                        />
                    ))}

                    <button type="submit" className="driver-button" disabled={loading}>
                        {loading ? "Processing..." : "Add Driver & Vehicle"}
                    </button>
                </form>

                {message && (
                    <p className={`driver-${message.includes("✅") ? "success" : "error"}`}>
                        {message}
                    </p>
                )}

                <h3 style={{ marginTop: "20px" }}>Current Drivers</h3>
                {loading && drivers.length === 0 ? (
                    <p>Loading drivers...</p>
                ) : (
                    <div className="driver-list">
                        {drivers.map((driver) => (
                            <div key={driver._id} className="driver-card">
                                <p><strong>{driver.name}</strong> ({driver.licenseNumber})</p>
                                <p>Vehicle: {driver.vehicleType} {driver.vin && `| VIN: ${driver.vin}`}</p>
                                {driver.model && <p>Model: {driver.model} | Year: {driver.year} | Fuel: {driver.fuelType}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DriverForm;
