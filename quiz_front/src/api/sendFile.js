import axios from 'axios'

const sendFile = async (file, groupId, subjectId) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/question/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('groupId', groupId);
    formData.append('subjectId', subjectId);
    const response = await axios.post(url, formData);
    return response.data;
}

export default sendFile;