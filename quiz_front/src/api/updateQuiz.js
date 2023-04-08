import axios from "axios";

const updateQuiz = async (quizId, questionsArray) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/quiz/${quizId}`;
    const postData = {
        questionIds: questionsArray,
    };
    const response = await axios.patch(url, postData);
    return response.data;
}

export default updateQuiz;