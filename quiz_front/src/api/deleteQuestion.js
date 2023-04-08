import axios from "axios";

const deleteQuestion = async (id) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/question/${id}`;
    const response = await axios.delete(url);
    return response.data;
}

export default deleteQuestion;