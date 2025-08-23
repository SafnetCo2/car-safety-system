import React, { useState, useEffect } from "react";

export default function IncidentList({ onNewIncident }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ driver: "", type: "", location: "" });

    // Fetch incidents
    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://car-safety-system.onrender.com/api/incidents");
            if (!res.ok) throw new Error("Failed to fetch incidents");
            const data = await res.json();
            setIncidents(data);
        } catch (err) {
            setError(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Fetch incidents on mount
    useEffect(() => {
        fetchIncidents();
    }, []);

    // Auto-refresh when a new incident is added
    useEffect(() => {
        if (onNewIncident) {
            fetchIncidents(); // Refresh list from backend
        }
    }, [onNewIncident]);

    // Delete incident
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://car-safety-system.onrender.com/api/incidents/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete incident");
            fetchIncidents();
        } catch (err) {
            setError(err?.message || "Something went wrong");
        }
    };

    // Start editing
    const handleEdit = (incident) => {
        setEditingId(incident._id);
        setEditData({ driver: incident.driver, type: incident.type, location: incident.location });
    };

    // Save edited incident
    const handleSave = async (id) => {
        try {
            const res = await fetch(`https://car-safety-system.onrender.com/api/incidents/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error("Failed to update incident");
            await res.json();
            setEditingId(null);
            setEditData({ driver: "", type: "", location: "" });
            fetchIncidents(); // Refresh after save
        } catch (err) {
            setError(err?.message || "Something went wrong");
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingId(null);
        setEditData({ driver: "", type: "", location: "" });
    };

    return (
        <div className="driver-list-container">
            <h3 className="driver-list-title">All Incidents</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="table-container">
                <table className="driver-table">
                    <thead>
                        <tr>
                            <th>Driver ID</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.length > 0 ? (
                            incidents.map((inc) => (
                                <tr key={inc._id}>
                                    <td>
                                        {editingId === inc._id ? (
                                            <input
                                                value={editData.driver}
                                                onChange={(e) => setEditData({ ...editData, driver: e.target.value })}
                                                className="driver-input-small"
                                            />
                                        ) : (
                                            inc.driver
                                        )}
                                    </td>
                                    <td>
                                        {editingId === inc._id ? (
                                            <input
                                                value={editData.type}
                                                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                                                className="driver-input-small"
                                            />
                                        ) : (
                                            inc.type
                                        )}
                                    </td>
                                    <td>
                                        {editingId === inc._id ? (
                                            <input
                                                value={editData.location}
                                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                                className="driver-input-small"
                                            />
                                        ) : (
                                            inc.location
                                        )}
                                    </td>
                                    <td>{inc.createdAt ? new Date(inc.createdAt).toLocaleString() : "N/A"}</td>
                                    <td className="actions">
                                        {editingId === inc._id ? (
                                            <>
                                                <button className="driver-button save" onClick={() => handleSave(inc._id)}>
                                                    Save
                                                </button>
                                                <button className="driver-button cancel" onClick={handleCancel}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="driver-button edit" onClick={() => handleEdit(inc)}>
                                                    Edit
                                                </button>
                                                <button className="driver-button delete" onClick={() => handleDelete(inc._id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No incidents found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
