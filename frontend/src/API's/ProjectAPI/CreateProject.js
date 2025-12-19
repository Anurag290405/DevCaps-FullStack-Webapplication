import axios from "axios";
import { API_URL, projects } from "../../NwConfig";

export default async function CreateProject(payload) {
  try {
    const response = await axios.post(API_URL + projects, payload, { withCredentials: true });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
