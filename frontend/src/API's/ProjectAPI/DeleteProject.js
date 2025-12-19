import axios from "axios";
import { API_URL, projects } from "../../NwConfig";

export default async function DeleteProject(id) {
  try {
    const response = await axios.delete(`${API_URL + projects}/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
