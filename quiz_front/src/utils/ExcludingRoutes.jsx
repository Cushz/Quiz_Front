import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ExcludingRoutes = () => {
    const token = localStorage.getItem("token");
    return (
        //if request is to /auth and token is present, don't change the route
        token && window.location.pathname === "/auth" ? <Navigate to="/dashboard" /> : <Outlet />
    );
    
}

export default ExcludingRoutes;