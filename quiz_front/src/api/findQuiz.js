import axios from "axios";

const findQuiz = async (subjectId, groupId) => {
    const postData = {
        subjectId: subjectId,
        groupId: groupId
    };
    const url = `${import.meta.env.VITE_APP_API_URL}/quiz/find`;
    try {
        console.log(postData);
        const response = await axios.post(url, postData);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return error.response; // return the response to handle the error in the calling function
        } else {
          throw error; // re-throw the error for other status codes
        }
      }
}

export default findQuiz;