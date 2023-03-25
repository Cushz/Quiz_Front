import axios from "axios";
import React from 'react'

const getSubject = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/subject`
    const response = await axios.get(url);
    return response.data;
}

export default getSubject;