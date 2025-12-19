import axios from "axios";
import { API_URL, contact } from "../../NwConfig";

export default async function InsertContactData(payload) {
  try {
    const response = await axios.post(API_URL + contact, payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || error?.message };
  }
}
