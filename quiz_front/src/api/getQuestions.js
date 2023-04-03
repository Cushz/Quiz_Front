import axios from "axios";

const getQuestions = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/question`;
    const response = await axios.get(url);
    return response.data;
}

export default getQuestions;