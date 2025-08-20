import React, { useEffect, useState } from "react";
import "../assets/styles/styles.css"
function DriverList() {
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

    // Fetch drivers
    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/drivers");
            const data = await res.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    // Delete driver
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this driver?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/drivers/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setDrivers(drivers.filter((driver) => driver._id !== id));
            }
        } catch (error) {
            console.error("Error deleting driver:", error);
        }
    };

    // Edit driver (open form)
    const handleEdit = (driver) => {
        setEditingDriver(driver._id);
        setEditForm(driver);
    };

    // Handle edit form change
    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    // Update driver
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/drivers/${editingDriver}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });

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

    return (
        <div className="driver-list-container">
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
                                <td>
                                    <input
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="licenseNumber"
                                        value={editForm.licenseNumber}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="vehicleType"
                                        value={editForm.vehicleType}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="vin"
                                        value={editForm.vin}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="model"
                                        value={editForm.model}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="year"
                                        value={editForm.year}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="fuelType"
                                        value={editForm.fuelType}
                                        onChange={handleChange}
                                        className="driver-input-small"
                                    />
                                </td>
                                <td>
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
                                    <button onClick={() => handleDelete(driver._id)} className="driver-button delete">
                                        Delete
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
