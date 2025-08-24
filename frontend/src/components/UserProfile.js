import React, { useEffect, useState } from "react";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("❌ No token found. Please login.");
            return;
        }

        fetch("https://car-safety-system.onrender.com/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?._id) {
                    setUser(data);
                    setMessage("");
                } else {
                    setMessage(data.message || "Failed to fetch user.");
                }
            })
            .catch(() => setMessage("❌ Error loading user."));
    }, []);

    return (
        <div className="form-container">
            <h2>User Profile</h2>
            {message && <p>{message}</p>}
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
