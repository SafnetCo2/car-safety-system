import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/styles.css";

function DriverDiagnostics() {
    const { driverId } = useParams();
    const navigate = useNavigate();
    const [diagnostics, setDiagnostics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        batteryLevel: "",
        tirePressure: "",
        engineTemp: "",
        notes: ""
    });
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");

    const fetchDiagnostics = useCallback(async () => {
        if (!driverId) return;
        setLoading(true);
        try {
            const res = await fetch(
                `https://car-safety-system.onrender.com/api/diagnostics/driver/${driverId}`
            );
            const data = await res.json();
            setDiagnostics(data);
        } catch (err) {
            console.error("Error fetching diagnostics:", err);
            setError("Failed to load diagnostics.");
        } finally {
            setLoading(false);
        }
    }, [driverId]);

    useEffect(() => {
        fetchDiagnostics();
    }, [fetchDiagnostics]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true);
        setError("");

        try {
            const res = await fetch(
                "https://car-safety-system.onrender.com/api/diagnostics",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        driver: driverId,
                        ...formData
                    })
                }
            );
            if (!res.ok) throw new Error("Failed to add diagnostic");
            const newDiag = await res.json();
            setDiagnostics([newDiag, ...diagnostics]);
            setFormData({ batteryLevel: "", tirePressure: "", engineTemp: "", notes: "" });
        } catch (err) {
            console.error(err);
            setError("Failed to post diagnostic.");
        } finally {
            setPosting(false);
        }
    };

    const handleReturn = () => {
        navigate(-1); // go back
    };

    const handlePrint = () => {
        window.print(); // print the page
    };

    const handleEnd = () => {
        navigate("/dashboard"); // go to dashboard (change path as needed)
    };

    if (loading) return <p>Loading diagnostics...</p>;
    if (!diagnostics.length) return <p>No diagnostics found for this driver.</p>;

    return (
        <div className="diagnostics-container">
            <h3>Diagnostics History</h3>

            <table className="diagnostics-table table-responsive">
                <thead>
                    <tr>
                        <th>Battery (%)</th>
                        <th>Tire Pressure</th>
                        <th>Engine Temp</th>
                        <th>Notes</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {diagnostics.map((diag) => (
                        <tr key={diag._id}>
                            <td data-label="Battery">{diag.batteryLevel}</td>
                            <td data-label="Tire Pressure">{diag.tirePressure}</td>
                            <td data-label="Engine Temp">{diag.engineTemp}</td>
                            <td data-label="Notes">{diag.notes}</td>
                            <td data-label="Date">{new Date(diag.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>Add New Diagnostic</h4>
            <form onSubmit={handleSubmit} className="driver-form">
                <input
                    type="number"
                    name="batteryLevel"
                    placeholder="Battery Level (%)"
                    value={formData.batteryLevel}
                    onChange={handleChange}
                    className="driver-input"
                    required
                />
                <input
                    type="number"
                    name="tirePressure"
                    placeholder="Tire Pressure"
                    value={formData.tirePressure}
                    onChange={handleChange}
                    className="driver-input"
                    required
                />
                <input
                    type="number"
                    name="engineTemp"
                    placeholder="Engine Temp"
                    value={formData.engineTemp}
                    onChange={handleChange}
                    className="driver-input"
                    required
                />
                <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="driver-input"
                />
                <button type="submit" className="driver-button" disabled={posting}>
                    {posting ? "Posting..." : "Add Diagnostic"}
                </button>
            </form>

            {error && <p className="driver-error show-message">{error}</p>}

            {/* Action Buttons */}
            <div className="diagnostic-actions" style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
                <button className="driver-button" onClick={handleReturn}>Return</button>
                <button className="driver-button" onClick={handlePrint}>Print</button>
                <button className="driver-button" onClick={handleEnd}>End</button>
            </div>
        </div>
    );
}

export default DriverDiagnostics;
