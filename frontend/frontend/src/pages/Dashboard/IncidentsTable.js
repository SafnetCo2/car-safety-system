import React from "react";

export default function QuickAction() {
    return (
        <div className="chart-wrapper">
            <h3>Quick Actions</h3>
            <button style={{ marginRight: "10px" }}>Run Diagnostics</button>
            <button style={{ marginRight: "10px" }}>View Alerts</button>
            <button>Generate Report</button>
        </div>
    );
}
