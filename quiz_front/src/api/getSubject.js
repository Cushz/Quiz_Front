import axios from "axios";

// Get subject from the API
const getSubject = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/subject`
    const response = await axios.get(url);
    return response.data;
}

export default getSubject;