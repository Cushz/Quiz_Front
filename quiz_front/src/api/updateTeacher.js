import axios from "axios";

const updateTeacher = async (teacherId, is_active) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/teacher/${teacherId}`;
    const patchData = {
        is_active: is_active,
    }
    const response = await axios.patch(url, patchData);
    return response.data;
}

export default updateTeacher;