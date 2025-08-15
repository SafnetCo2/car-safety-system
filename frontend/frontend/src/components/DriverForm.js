import React, { useState } from "react";

function DriverForm({ onDriverAdded }) {
    const [name, setName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("https://car-safety-system.onrender.com/api/drivers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, licenseNumber, vehicleType })
            });

            if (!res.ok) throw new Error(`Error ${res.status}`);

            const data = await res.json();
            setMessage("✅ Driver added successfully!");

            // Clear form
            setName("");
            setLicenseNumber("");
            setVehicleType("");

            // Pass new driver back to parent (to update DriverCard list)
            if (onDriverAdded) onDriverAdded(data);

        } catch (error) {
            console.error("Error adding driver:", error);
            setMessage("❌ Failed to add driver");
        }
    };

    return (
        <div>
            <h2>Add Driver</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Driver Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br />
                <input
                    type="text"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                /><br />
                <input
                    type="text"
                    placeholder="Vehicle Type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                /><br />
                <button type="submit">Add Driver</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DriverForm;
