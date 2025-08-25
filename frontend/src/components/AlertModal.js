// AlertModal.js
import React from "react";

function AlertModal({ message, severity, onClose }) {
    if (!message) return null;

    // Use CSS classes based on severity
    const className =
        severity === "high"
            ? "driver-error show-message"
            : "driver-success show-message";

    return (
        <div className={className}>
            {message}
            <button
                style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    fontWeight: "bold",
                }}
                onClick={onClose}
            >
                ✖
            </button>
        </div>
    );
}

export default AlertModal;
