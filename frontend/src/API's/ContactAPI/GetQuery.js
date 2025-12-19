import axios from "axios";
import { API_URL, contact } from "../../NwConfig";

export default async function GetQuery() {
    try {
        const url = API_URL + contact;
        const request = await axios.get(url, { withCredentials: true });
        return request.data;
    } catch (error) {
        return error.message;
    }
}