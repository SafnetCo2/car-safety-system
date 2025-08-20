import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/styles.css";

function DriverList({ refresh }) {
    const [drivers, setDrivers] = useState([]);
    const [editingDriver, setEditingDriver] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        licenseNumber: "",
        vehicleType: "",
        vin: "",
        model: "",
        year: "",
        fuelType: "",
    });

    const navigate = useNavigate();

    // Fetch drivers
    useEffect(() => {
        fetchDrivers();
    }, [refresh]);

    const fetchDrivers = async () => {
        try {
            const res = await fetch("https://car-safety-system.onrender.com/api/drivers");
            const data = await res.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this driver?")) return;
        try {
            const res = await fetch(`https://car-safety-system.onrender.com/api/drivers/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setDrivers(drivers.filter((driver) => driver._id !== id));
            }
        } catch (error) {
            console.error("Error deleting driver:", error);
        }
    };

    const handleEdit = (driver) => {
        setEditingDriver(driver._id);
        setEditForm(driver);
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `https://car-safety-system.onrender.com/api/drivers/${editingDriver}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editForm),
                }
            );

            if (res.ok) {
                setDrivers(
                    drivers.map((driver) =>
                        driver._id === editingDriver ? { ...editForm, _id: editingDriver } : driver
                    )
                );
                setEditingDriver(null);
            }
        } catch (error) {
            console.error("Error updating driver:", error);
        }
    };

    const handleReturn = () => {
        navigate("/dashboard"); // navigate to dashboard
    };

    return (
        <div className="driver-list-container table-responsive">
            <div className="top-button-bar">
                <button
                    className="driver-button"
                    onClick={() => navigate("/dashboard")} // Return button
                >
                    Return
                </button>
                <button
                    className="driver-button"
                    onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        navigate("/login"); // Logout button
                    }}
                >
                    Logout
                </button>
            </div>


            <h2 className="driver-list-title">Registered Drivers</h2>
            <table className="driver-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>License</th>
                        <th>Vehicle Type</th>
                        <th>VIN</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Fuel</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) =>
                        editingDriver === driver._id ? (
                            <tr key={driver._id}>
                                <td data-label="Name">
                                    <input
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="License">
                                    <input
                                        name="licenseNumber"
                                        value={editForm.licenseNumber}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="Vehicle Type">
                                    <input
                                        name="vehicleType"
                                        value={editForm.vehicleType}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="VIN">
                                    <input
                                        name="vin"
                                        value={editForm.vin}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="Model">
                                    <input
                                        name="model"
                                        value={editForm.model}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="Year">
                                    <input
                                        name="year"
                                        value={editForm.year}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="Fuel">
                                    <input
                                        name="fuelType"
                                        value={editForm.fuelType}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td data-label="Actions">
                                    <button onClick={handleUpdate} className="driver-button save">
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingDriver(null)}
                                        className="driver-button cancel"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={driver._id}>
                                <td data-label="Name">{driver.name}</td>
                                <td data-label="License">{driver.licenseNumber}</td>
                                <td data-label="Vehicle Type">{driver.vehicleType}</td>
                                <td data-label="VIN">{driver.vin}</td>
                                <td data-label="Model">{driver.model}</td>
                                <td data-label="Year">{driver.year}</td>
                                <td data-label="Fuel">{driver.fuelType}</td>
                                <td data-label="Actions">
                                    <button onClick={() => handleEdit(driver)} className="driver-button edit">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(driver._id)}
                                        className="driver-button delete"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => navigate(`/diagnostics/${driver._id}`)}
                                        className="driver-button view"
                                    >
                                        View Diagnostics
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DriverList;
