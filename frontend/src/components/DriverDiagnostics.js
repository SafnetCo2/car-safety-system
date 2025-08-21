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

    // Fetch diagnostics
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

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
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
                    body: JSON.stringify({ driver: driverId, ...formData })
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

    if (loading) return <p>Loading diagnostics...</p>;

    return (
        <div className="diagnostics-container table-responsive">
            <h3>Diagnostics History</h3>

            {diagnostics.length > 0 ? (
                <table className="diagnostics-table">
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
            ) : (
                <p>No diagnostics found for this driver.</p>
            )}

            <h3>{diagnostics.length === 0 ? "Add First Diagnostic" : "Add Another Diagnostic"}</h3>
            <form className="driver-form" onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="batteryLevel"
                    placeholder="Battery (%)"
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

            {/* Fixed Button Bar */}
            <div className="fixed-button-bar">
                <button className="driver-button" onClick={() => window.print()}>
                    Print
                </button>
                <button className="driver-button" onClick={() => navigate(-1)}>
                    Return
                </button>
                <button className="driver-button" onClick={() => navigate("/dashboard")}>
                    End
                </button>
            </div>
        </div>
    );
}

export default DriverDiagnostics;
