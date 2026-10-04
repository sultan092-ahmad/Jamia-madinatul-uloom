const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

async function createAdmin() {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected ✅");

        const existingAdmin = await User.findOne({
            email: "admin@jamia.com"
        });

        if (existingAdmin) {
            console.log("Admin already exists ❗");
            await mongoose.disconnect();
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@12345", 10);

        const admin = new User({
            name: "Jamia Admin",
            email: "admin@jamia.com",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();

        console.log("Admin created successfully ✅");
        console.log("Email: admin@jamia.com");
        console.log("Password: Admin@12345");

        await mongoose.disconnect();

    } catch (error) {
        console.log("Error ❌:", error.message);
        await mongoose.disconnect();
    }
}

createAdmin();