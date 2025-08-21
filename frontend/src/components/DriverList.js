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
    const [loading, setLoading] = useState(true); // Loading state

    const navigate = useNavigate();

    // Fetch drivers
    useEffect(() => {
        fetchDrivers();
    }, [refresh]);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                "https://car-safety-system.onrender.com/api/drivers"
            );
            const data = await res.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this driver?")) return;
        try {
            const res = await fetch(
                `https://car-safety-system.onrender.com/api/drivers/${id}`,
                { method: "DELETE" }
            );
            if (res.ok) setDrivers(drivers.filter((driver) => driver._id !== id));
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

    const handleReturn = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="driver-list-container table-responsive">
            <div className="top-button-bar">
                <button className="driver-button" onClick={handleReturn}>
                    Return
                </button>
                <button className="driver-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <h2 className="driver-list-title">Registered Drivers</h2>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading drivers...</p>
                </div>
            ) : drivers.length === 0 ? ( // ✅ No drivers found message
                <p style={{ textAlign: "center", marginTop: "20px" }}>No drivers found.</p>
            ) : (
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
                                    {["name", "licenseNumber", "vehicleType", "vin", "model", "year", "fuelType"].map((field) => (
                                        <td key={field} data-label={field}>
                                            <input
                                                name={field}
                                                value={editForm[field]}
                                                onChange={handleChange}
                                                className="driver-input-small"
                                            />
                                        </td>
                                    ))}
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
                                    <td>{driver.name}</td>
                                    <td>{driver.licenseNumber}</td>
                                    <td>{driver.vehicleType}</td>
                                    <td>{driver.vin}</td>
                                    <td>{driver.model}</td>
                                    <td>{driver.year}</td>
                                    <td>{driver.fuelType}</td>
                                    <td>
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
            )}
        </div>
    );
}

export default DriverList;
