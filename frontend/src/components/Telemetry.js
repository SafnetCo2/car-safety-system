import React, { useEffect, useState } from "react";
import "./dashboard-styles.css"; // same CSS

function Telemetry() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Example fetch call
        fetch("/api/telemetry")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="diagnostics-container">
            <h3>Vehicle Telemetry</h3>
            <div className="table-responsive">
                <table className="diagnostics-table">
                    <thead>
                        <tr>
                            <th>Speed</th>
                            <th>RPM</th>
                            <th>Tire Pressure</th>
                            <th>Battery</th>
                            <th>Fuel Level</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td data-label="Speed">{item.speed}</td>
                                <td data-label="RPM">{item.rpm}</td>
                                <td data-label="Tire Pressure">{item.tirePressure}</td>
                                <td data-label="Battery">{item.battery}</td>
                                <td data-label="Fuel Level">{item.fuelLevel}</td>
                                <td data-label="Timestamp">{item.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Telemetry;
