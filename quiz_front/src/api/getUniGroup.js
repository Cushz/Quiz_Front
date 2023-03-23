import axios from "axios";
import React from 'react'

const getUniGroup = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/unigroup`
    const response = await axios.get(url);
    return response.data;
}

export default getUniGroup;