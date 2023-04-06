import axios from "axios";

const createQuiz = async (subjectId, groupId, questionsArray) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/quiz`;
    const postData = {
        subjectId: subjectId,
        groupId: groupId,
        questionIds: questionsArray,
    };
    console.log("postData", postData);
    const response = await axios.post(url, postData);
    return response.data;
}

export default createQuiz;