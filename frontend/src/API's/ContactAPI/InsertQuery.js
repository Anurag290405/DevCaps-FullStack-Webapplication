import axios from "axios";
import { API_URL, contact } from "../../NwConfig";

export default async function InsertQuery(form) {
    try {
        const url = API_URL + contact;
        const request = await axios.post(url, form);
        return request.data;
    } catch (error) {
        return error.message;
    }
}