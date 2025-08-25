import React, { useState } from "react";
import "./dashboard-styles.css"; // use your full CSS file here

function VehicleRegistration() {
    const [vehicle, setVehicle] = useState({
        vin: "",
        model: "",
        year: "",
        fuelType: "",
        driver: ""
    });

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Vehicle Registered:", vehicle);
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Register Vehicle</h2>
                <form className="driver-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="vin"
                        className="driver-input"
                        placeholder="VIN"
                        value={vehicle.vin}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="model"
                        className="driver-input"
                        placeholder="Model"
                        value={vehicle.model}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="year"
                        className="driver-input"
                        placeholder="Year"
                        value={vehicle.year}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fuelType"
                        className="driver-input"
                        placeholder="Fuel Type"
                        value={vehicle.fuelType}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="driver"
                        className="driver-input"
                        placeholder="Assigned Driver"
                        value={vehicle.driver}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="driver-button">Register</button>
                </form>
            </div>
        </div>
    );
}

export default VehicleRegistration;
