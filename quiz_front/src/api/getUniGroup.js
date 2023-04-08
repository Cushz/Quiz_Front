import axios from "axios";

// Get unigroup data from the API
export default async function getUniGroup() {
    const url = `${import.meta.env.VITE_APP_API_URL}/unigroup`
    const response = await axios.get(url);
    return response.data;
}