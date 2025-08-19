import React, { useEffect, useState } from "react";
import DriverCard from "./DriverCard";
import API_URL from "../utils/api";

function DriverList() {
    const [drivers, setDrivers] = useState([]);

    const fetchDrivers = async () => {
        try {
            const response = await fetch(`${API_URL}/drivers`);
            if (!response.ok) throw new Error("Failed to fetch drivers");
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error("Failed to fetch drivers:", error);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className="driver-list">
            <h2>Registered Drivers</h2>
            {drivers.length === 0 ? (
                <p>No drivers found.</p>
            ) : (
                drivers.map((driver) => (
                    <DriverCard
                        key={driver._id}
                        name={driver.name}
                        licenseNumber={driver.licenseNumber}
                        vehicleType={driver.vehicleType}
                    />
                ))
            )}
        </div>
    );
}

export default DriverList;
