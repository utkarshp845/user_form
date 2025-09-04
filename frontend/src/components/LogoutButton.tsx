import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    if (!token) return null;

    return (
        <button onClick={handleLogout} style={{ marginLeft: '16px' }}>Logout</button>
    );
}

export default LogoutButton;