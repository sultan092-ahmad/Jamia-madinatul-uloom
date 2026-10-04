const adminMiddleware = require("../middleware/adminMiddleware");
const express = require("express");
const Program = require("../models/Program");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET ALL PROGRAMS
// ===============================

router.get("/", async (req, res) => {
    try {
        const programs = await Program.find().sort({
            createdAt: -1
        });

        res.json({
            success: true,
            programs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ===============================
// GET SINGLE PROGRAM
// ===============================

router.get("/:id", async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({
                success: false,
                message: "Program not found"
            });
        }

        res.json({
            success: true,
            program
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ===============================
// ADD PROGRAM
// ADMIN ONLY
// ===============================

router.post("/",authMiddleware,adminMiddleware,async (req, res) => {
    try {
        const program = await Program.create(req.body);

        res.status(201).json({
            success: true,
            message: "Program added successfully",
            program
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


// ===============================
// UPDATE PROGRAM
// ADMIN ONLY
// ===============================

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!program) {
            return res.status(404).json({
                success: false,
                message: "Program not found"
            });
        }

        res.json({
            success: true,
            message: "Program updated successfully",
            program
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


// ===============================
// DELETE PROGRAM
// ADMIN ONLY
// ===============================

router.delete("/:id", authMiddleware,adminMiddleware, async (req, res) => {
    try {
        const program = await Program.findByIdAndDelete(
            req.params.id
        );

        if (!program) {
            return res.status(404).json({
                success: false,
                message: "Program not found"
            });
        }

        res.json({
            success: true,
            message: "Program deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;