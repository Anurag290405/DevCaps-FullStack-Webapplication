import axios from "axios";
import { API_URL } from "../../NwConfig";

export default async function Verify() {
  try {
    const url = `${API_URL}/api/auth/verify`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Verify error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Verification failed"
    };
  }
}