import axios from "axios";
import { API_URL } from "../../NwConfig";

export default async function Logout() {
  try {
    const url = `${API_URL}/api/auth/logout`;
    const response = await axios.post(url, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: error.message
    };
  }
}