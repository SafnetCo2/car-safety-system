// src/pages/Dashboard/ChartsSection.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ChartsSection({ data }) {
    return (
        <div className="charts-section">
            <h3>Incident Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incidents" stroke="#ff4d4f" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#4caf50" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
