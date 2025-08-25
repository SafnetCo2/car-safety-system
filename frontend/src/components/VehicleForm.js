import React, { useState } from "react";
import "../assets/styles/styles.css"; // reuse your driver form styles

function VehicleForm({ onVehicleAdded }) {
    const [vehicle, setVehicle] = useState({ vin: "", model: "", year: "", fuel: "", driver: "" });
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // simulate API call
        console.log(vehicle);
        setSuccess(true);
        onVehicleAdded?.();
        setVehicle({ vin: "", model: "", year: "", fuel: "", driver: "" });
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Add Vehicle</h2>
                <form className="driver-form" onSubmit={handleSubmit}>
                    <input type="text" name="vin" placeholder="VIN" value={vehicle.vin} onChange={handleChange} className="driver-input" required />
                    <input type="text" name="model" placeholder="Model" value={vehicle.model} onChange={handleChange} className="driver-input" required />
                    <input type="number" name="year" placeholder="Year" value={vehicle.year} onChange={handleChange} className="driver-input" required />
                    <input type="text" name="fuel" placeholder="Fuel Type" value={vehicle.fuel} onChange={handleChange} className="driver-input" required />
                    <input type="text" name="driver" placeholder="Assigned Driver" value={vehicle.driver} onChange={handleChange} className="driver-input" />
                    <button type="submit" className="driver-button">Add Vehicle</button>
                    {success && <p className="driver-success show-message">Vehicle added successfully!</p>}
                </form>
            </div>
        </div>
    );
}

export default VehicleForm;
