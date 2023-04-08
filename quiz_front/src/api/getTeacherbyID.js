import axios from "axios";

const getTeacherbyID = async (id) => {
    try {
        // make a request to our API and return the body of the response
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/teacher/${id}`);
        return response.data;
    }    
     catch (error) {
        // if something goes wrong, throw an error
        throw error;
}
}
export default getTeacherbyID;