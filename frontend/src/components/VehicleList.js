import React, { useState, useEffect } from "react";
import "../assets/styles/styles.css";

function VehicleList({ refresh }) {
    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // simulate fetch
        setVehicles([
            { vin: "1HGCM82633A004352", model: "Toyota Corolla", year: 2022, fuel: "Petrol", driver: "John Doe" },
            { vin: "1HGCM82633A004353", model: "Honda Civic", year: 2021, fuel: "Diesel", driver: "Jane Smith" },
        ]);
    }, [refresh]);

    const handleEdit = (vin) => {
        alert(`Edit Vehicle: ${vin}`);
    };

    const handleDelete = (vin) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            setVehicles(prev => prev.filter(v => v.vin !== vin));
        }
    };

    const filtered = vehicles.filter(v =>
        v.vin.includes(search) ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.driver.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="driver-list-container">
            <h2 className="driver-list-title">Vehicle List</h2>

            {/* Centered Search */}
            <div className="top-button-bar">
                <input
                    type="text"
                    placeholder="Search VIN, Model, Driver..."
                    className="driver-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="driver-table">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Fuel</th>
                            <th>Driver</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((v, idx) => (
                            <tr key={idx}>
                                <td data-label="VIN">{v.vin}</td>
                                <td data-label="Model">{v.model}</td>
                                <td data-label="Year">{v.year}</td>
                                <td data-label="Fuel">{v.fuel}</td>
                                <td data-label="Driver">{v.driver}</td>
                                <td data-label="Actions">
                                    <div className="actions">
                                        <button className="driver-button edit" onClick={() => handleEdit(v.vin)}>Edit</button>
                                        <button className="driver-button delete" onClick={() => handleDelete(v.vin)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                                    No vehicles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VehicleList;
