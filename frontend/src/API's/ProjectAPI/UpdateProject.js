import axios from "axios";
import { API_URL, projects } from "../../NwConfig";

export default async function UpdateProject(id, payload) {
  try {
    const response = await axios.put(`${API_URL + projects}/${id}`, payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
