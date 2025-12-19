import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./src/models/Admin.js";
import connectDb from "./src/config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDb();
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@devcaps.com" });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      email: "admin@devcaps.com",
      password: "admin123",
      name: "Admin"
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    console.log("Email: admin@devcaps.com");
    console.log("Password: admin123");
    console.log("\n⚠️  Please change the password after first login!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
