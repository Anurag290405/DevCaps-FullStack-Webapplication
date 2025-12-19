import axios from "axios";
import { API_URL, successstories } from "../../NwConfig";

export default async function GetSuccessData() {
  try {
    const response = await axios.get(API_URL + successstories);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}