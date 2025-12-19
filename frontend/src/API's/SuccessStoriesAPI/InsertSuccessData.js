import axios from "axios";
import { API_URL, successstories } from "../../NwConfig";

export default async function InsertSuccessData(payload) {
    try {
        const response = await axios.post(API_URL + successstories, payload, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error?.message };
    }
}