import axios from "axios";

import React from 'react'

const getUserInfo = async () => {
    const url = `http://localhost:3000/teacher/me`;
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        return null;
    }
}

export default getUserInfo