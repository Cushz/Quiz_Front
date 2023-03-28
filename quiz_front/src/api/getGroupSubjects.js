import axios from "axios";
import React from 'react'

const getGroupSubjects = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/unigroup/subjects`
    const response = await axios.get(url);
    return response.data;
}

export default getGroupSubjects;