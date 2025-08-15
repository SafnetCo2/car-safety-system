import React, { useEffect, useState } from "react";
import DriverCard from "./DriverCard";

function DriverList() {
    const [drivers, setDrivers] = useState([]);

    const fetchDrivers = async () => {
        try {
            const res = await fetch("https://car-safety-system.onrender.com/api/drivers");
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setDrivers(data);
        } catch (err) {
            console.error("Failed to fetch drivers:", err);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div>
            <h2>Driver List</h2>
            {drivers.length > 0 ? (
                drivers.map(driver => (
                    <DriverCard
                        key={driver._id}
                        name={driver.name}
                        licenseNumber={driver.licenseNumber}
                        vehicleType={driver.vehicleType}
                    />
                ))
            ) : (
                <p>No drivers found.</p>
            )}
        </div>
    );
}

export default DriverList;
