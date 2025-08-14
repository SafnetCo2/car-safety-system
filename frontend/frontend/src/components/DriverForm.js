import React, { useState, useEffect } from "react";
import { getDrivers, createDriver } from "../services/driverService";

export default function DriverForm() {
    const [drivers, setDrivers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        licenseNumber: "",
        vehicleType: ""
    });

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        const data = await getDrivers();
        setDrivers(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createDriver(formData);
        setFormData({ name: "", licenseNumber: "", vehicleType: "" });
        fetchDrivers();
    };

    return (
        <div>
            <h2>Drivers</h2>
            <ul>
                {drivers.map(driver => (
                    <li key={driver._id}>{driver.name} - {driver.vehicleType}</li>
                ))}
            </ul>
            <h3>Add Driver</h3>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} required />
                <input name="vehicleType" placeholder="Vehicle Type" value={formData.vehicleType} onChange={handleChange} required />
                <button type="submit">Add Driver</button>
            </form>
        </div>
    );
}
