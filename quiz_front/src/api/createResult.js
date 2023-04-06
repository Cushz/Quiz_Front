import axios from "axios";

const createResult = async (quizId, student, scoreTotal, scoreAchieved) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/result`;
    const postData = {
        quizId: quizId,
        student: student,
        scoreTotal: scoreTotal,
        scoreAchieved: scoreAchieved,
    };
    console.log("postData", postData);
    const response = await axios.post(url, postData);
    return response.data;
}

export default createResult;