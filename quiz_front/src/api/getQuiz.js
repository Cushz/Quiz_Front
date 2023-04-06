import axios from "axios";

const getQuiz = async (quizId) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/quiz/${quizId}`;
    const response = await axios.get(url);
    return response.data;
}

export default getQuiz;