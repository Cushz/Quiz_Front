import axios from "axios";

const getTeacherbyID = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/teacher/${id}`);
        return response.data;
    }    
     catch (error) {
        throw error;
}
}
export default getTeacherbyID;