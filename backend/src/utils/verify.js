import jwt from "jsonwebtoken";
import Auth from "../models/CommonModels/auth.model.js";
import dotenv from "dotenv";
dotenv.config();

const verify = async (req, res) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
      return res.status(401).json({ message: "No token found, please login" });
    }

    // 2. Verify token and extract payload
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const { email } = decoded; // email stored in token
    console.log("Decoded token:", decoded);

    // 3. Fetch user from MongoDB using Auth model
    const user = await Auth.findOne(
      { email }
      );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User verified successfully");

    // 4. Send response with user data
    res.status(200).json({
      message: "Admin verified successfully",
      email: user.email,
      name:user.username
});

  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Error verifying user", error: error.message || error });
  }
};

export { verify };
