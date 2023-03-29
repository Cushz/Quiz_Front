import axios from "axios";

// Get the unigroup by its ID.
const getUnigroupbyID = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/unigroup/${id}`);
        return response.data;
    }    
     catch (error) {
        throw error;
}
}
export default getUnigroupbyID;