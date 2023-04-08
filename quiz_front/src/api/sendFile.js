import axios from 'axios'

const sendFile = async (file, groupId, subjectId) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/question/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('groupId', groupId);
    formData.append('subjectId', subjectId);
    try {
        const response = await axios.post(url, formData);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return error.response; // return the response to handle the error in the calling function
        } else {
          throw error; // re-throw the error for other status codes
        }
      }
}

export default sendFile;