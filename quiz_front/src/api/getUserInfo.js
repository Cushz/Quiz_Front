import axios from "axios";

const getUserInfo = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/teacher/me`;
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        return null;
    }
}

export default getUserInfo