import axios from "axios";

import React from 'react'

const login = async (email, password) => {

    const data = {email, password};

    const url = `${import.meta.env.VITE_APP_API_URL}/auth/login`;

  
    try {
        const response = await axios.post(url, data);
        return response.data.access_token;
        
    } catch (error) {
        return null;
        
    }
}

export default login
