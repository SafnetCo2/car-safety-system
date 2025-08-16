import React, { useEffect, useState } from "react";
import DriverCard from "./DriverCard";

// Use environment variable
const API_URL = process.env.REACT_APP_API_URL + "/drivers";

function DriverList() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDrivers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(API_URL, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include" // optional if backend uses cookies/auth
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            setDrivers(data);
        } catch (err) {
            console.error("Failed to fetch drivers:", err);
            setError("Failed to load drivers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div>
            <h2>Driver List</h2>
            {loading ? (
                <p>Loading drivers...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : drivers.length > 0 ? (
                drivers.map(driver => (
                    <DriverCard
                        key={driver._id}
                        name={driver.name}
                        licenseNumber={driver.licenseNumber}
                        vehicleType={driver.vehicleType}
                        vin={driver.vin}
                        model={driver.model}
                        year={driver.year}
                        fuelType={driver.fuelType}
                    />
                ))
            ) : (
                <p>No drivers found.</p>
            )}
        </div>
    );
}

export default DriverList;
