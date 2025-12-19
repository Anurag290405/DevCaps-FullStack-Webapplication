import axios from "axios";
import { API_URL, subscribe } from "../../NwConfig";

export default async function GetEmails() {
    try {
        const url = API_URL + subscribe;
        const request = await axios.get(url);
        return request.data;
    } catch (error) {
        return error.message;
    }
}