import axios from "axios";

import React from 'react'

const login = async (email, password) => {

    const data = {email, password};
    // console.log(process.env.REACT_APP_API_URL)

    const url = `http://localhost:3000/auth/login`;

  
    try {
        const response = await axios.post(url, data);
        return response.data.access_token;
        
    } catch (error) {
        return null;
        
    }
}

export default login
