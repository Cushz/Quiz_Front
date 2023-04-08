import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const token = localStorage.getItem("token");
    return (
        //if request is to /auth and token is present, don't change the route
        token ? <Outlet /> : <Navigate to="/auth" />
        
    );
    
}

export default PrivateRoutes;