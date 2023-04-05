import axios from "axios";

const createQuiz = async (subjectId, groupId, questionsArray) => {
    const data = {
        subjectId,
        groupId,
        questionsArray
    }
    const url = `${import.meta.env.VITE_APP_API_URL}/quiz`;
    axios
    .post(url, data)
    .then((response) => {
      // handle success
      console.log(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
}

export default createQuiz;