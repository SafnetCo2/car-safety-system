// src/pages/Reports.js
import React, { useEffect, useState } from "react";

function Reports() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch("https://car-safety-system.onrender.com/api/incidents")
            .then((res) => res.json())
            .then((data) => setReports(data))
            .catch((err) => console.error("❌ Error fetching reports:", err));
    }, []);

    return (
        <div>
            <h1>🚨 Incident Reports</h1>
            {reports.length === 0 ? (
                <p>No incident reports found.</p>
            ) : (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Driver</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td>{report.driver?.name || "Unknown"}</td>
                                <td>{report.type}</td>
                                <td>{report.description}</td>
                                <td>{new Date(report.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Reports;
