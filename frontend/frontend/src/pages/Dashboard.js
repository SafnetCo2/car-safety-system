import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DriverCard from "../components/DriverCard";
import { getDrivers } from "../services/driverService";

function Dashboard() {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        getDrivers().then(data => setDrivers(data));
    }, []);

    return (
        <div>
            <Navbar />
            <main className="dashboard">
                <h2>Driver Dashboard</h2>
                <div className="driver-list">
                    {drivers.map(driver => (
                        <DriverCard
                            key={driver._id}
                            name={driver.name}
                            licenseNumber={driver.licenseNumber}
                            vehicleType={driver.vehicleType}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;
