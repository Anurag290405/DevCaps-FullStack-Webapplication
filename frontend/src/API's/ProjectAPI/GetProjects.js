import axios from "axios";
import { API_URL, projects } from "../../NwConfig";

export default async function GetProjects() {
  try {
    const response = await axios.get(API_URL + projects);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
