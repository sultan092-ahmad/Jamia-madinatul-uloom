const express = require("express");
const Teacher = require("../models/Teacher");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================
// ADMIN CHECK
// =====================================

const adminOnly = (req, res, next) => {

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    next();
};


// =====================================
// GET ALL TEACHERS
// Public
// =====================================

router.get("/", async (req, res) => {

    try {

        const teachers = await Teacher.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            teachers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =====================================
// ADD TEACHER
// Admin Only
// =====================================

router.post("/", authMiddleware, adminOnly, async (req, res) => {

    try {

        const teacher = await Teacher.create(req.body);

        res.status(201).json({
            success: true,
            message: "Teacher added successfully",
            teacher
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

});


// =====================================
// UPDATE TEACHER
// Admin Only
// =====================================

router.put("/:id", authMiddleware, adminOnly, async (req, res) => {

    try {

        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!teacher) {

            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });

        }

        res.json({
            success: true,
            message: "Teacher updated successfully",
            teacher
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =====================================
// DELETE TEACHER
// Admin Only
// =====================================

router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {

    try {

        const teacher = await Teacher.findByIdAndDelete(
            req.params.id
        );

        if (!teacher) {

            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });

        }

        res.json({
            success: true,
            message: "Teacher deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;