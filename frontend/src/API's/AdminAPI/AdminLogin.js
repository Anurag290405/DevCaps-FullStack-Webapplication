import axios from "axios";
import { API_URL } from "../../NwConfig";

export default async function AdminLogin(email, password) {
  try {
    const url = `${API_URL}/api/auth/login`;
    const response = await axios.post(
      url,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed"
    };
  }
}