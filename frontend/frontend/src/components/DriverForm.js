import React, { useState } from "react";

function DriverForm() {
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
    const [messageType, setMessageType] = useState(""); // success or error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/drivers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("Driver submitted successfully!");
                setMessageType("success");
                setFormData({
                    name: "",
                    licenseNumber: "",
                    vehicleType: "",
                    vin: "",
                    model: "",
                    year: "",
                    fuelType: "",
                });
            } else {
                setMessage("Failed to submit driver.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error submitting driver.");
            setMessageType("error");
        }
    };

    return (
        <div className="driver-form-container">
            <div className="driver-form-card">
                <h2 className="driver-form-title">Register Driver</h2>

                <form className="driver-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Driver Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="driver-input"
                        required
                    />
                    <input
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="driver-input"
                        required
                    />
                    <input
                        type="text"
                        name="vehicleType"
                        placeholder="Vehicle Type"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="driver-input"
                    />
                    <input
                        type="text"
                        name="vin"
                        placeholder="VIN"
                        value={formData.vin}
                        onChange={handleChange}
                        className="driver-input"
                    />
                    <input
                        type="text"
                        name="model"
                        placeholder="Car Model"
                        value={formData.model}
                        onChange={handleChange}
                        className="driver-input"
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleChange}
                        className="driver-input"
                    />
                    <input
                        type="text"
                        name="fuelType"
                        placeholder="Fuel Type"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="driver-input"
                    />

                    <button type="submit" className="driver-button">
                        Submit
                    </button>
                </form>

                {/* Success / Error messages */}
                {message && (
                    <p
                        className={`${messageType === "success" ? "driver-success show-message" : "driver-error show-message"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default DriverForm;
