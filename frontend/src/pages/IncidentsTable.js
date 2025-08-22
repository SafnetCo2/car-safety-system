// src/pages/Dashboard/IncidentsTable.jsx
import React from "react";

export default function IncidentsTable({ incidents }) {
    return (
        <div className="incidents-table">
            <h3>Incident Logs</h3>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Driver</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.length > 0 ? (
                        incidents.map((incident) => (
                            <tr key={incident._id}>
                                <td>{incident.type}</td>
                                <td>{incident.location}</td>
                                <td>{incident.driver}</td>
                                <td>{new Date(incident.timestamp).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No incidents found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
