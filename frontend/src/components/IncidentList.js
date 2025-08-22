import React, { useState, useEffect } from "react";

export default function IncidentList({ newManualIncident }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ driver: "", type: "", location: "" });

    // Fetch incidents on mount
    useEffect(() => {
        fetchIncidents();
    }, []);

    // Add manual new incident to list
    useEffect(() => {
        if (newManualIncident) {
            setIncidents((prev) => [newManualIncident, ...prev]);
        }
    }, [newManualIncident]);

    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://car-safety-system.onrender.com/api/incidents");
            const data = await res.json();
            setIncidents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete incident
    const handleDelete = async (id) => {
        try {
            await fetch(`https://car-safety-system.onrender.com/api/incidents/${id}`, { method: "DELETE" });
            setIncidents((prev) => prev.filter((inc) => inc._id !== id));
        } catch (err) {
            setError(err.message);
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
            const updated = await res.json();
            setIncidents((prev) => prev.map((inc) => (inc._id === id ? updated : inc)));
            setEditingId(null);
        } catch (err) {
            setError(err.message);
        }
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
                        {incidents.map((inc) => (
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
                                <td>{new Date(inc.createdAt).toLocaleString()}</td>
                                <td className="actions" data-label="Actions">
                                    {editingId === inc._id ? (
                                        <>
                                            <button className="driver-button save" onClick={() => handleSave(inc._id)}>
                                                Save
                                            </button>
                                            <button className="driver-button cancel" onClick={() => setEditingId(null)}>
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
