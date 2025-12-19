import axios from "axios";
import { API_URL, subscribe } from "../../NwConfig";

export default async function InsertEmail(form) {
    try {
        const url = API_URL + subscribe;
        const request = await axios.post(url, form);
        return request.data;
    } catch (error) {
        return error.message;
    }
}