const admissionRoutes = require("./routes/admissionRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const programRoutes = require("./routes/programRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admissions", admissionRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Jamia Madinatul Uloom Backend is running!"
    });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected Successfully ✅");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed ❌");
        console.log(error.message);
    });