const express = require("express");
const Admission = require("../models/Admission");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// SUBMIT ADMISSION
// =========================

router.post("/", async (req, res) => {

    try {

        const admission = await Admission.create(req.body);

        res.status(201).json({
            success: true,
            message: "Admission form submitted successfully",
            admission
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

});


// =========================
// GET ALL ADMISSIONS
// ADMIN ONLY
// =========================

router.get("/", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });

        }

        const admissions =
            await Admission.find()
                .sort({ createdAt: -1 });

        res.json({
            success: true,
            admissions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =========================
// GET SINGLE ADMISSION
// ADMIN ONLY
// =========================

router.get("/:id", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });

        }

        const admission =
            await Admission.findById(req.params.id);

        if (!admission) {

            return res.status(404).json({
                success: false,
                message: "Admission not found"
            });

        }

        res.json({
            success: true,
            admission
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =========================
// UPDATE STATUS
// ADMIN ONLY
// =========================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });

        }

        const admission =
            await Admission.findByIdAndUpdate(
                req.params.id,
                {
                    status: req.body.status
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!admission) {

            return res.status(404).json({
                success: false,
                message: "Admission not found"
            });

        }

        res.json({
            success: true,
            message: "Admission status updated successfully",
            admission
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

});


// =========================
// DELETE ADMISSION
// ADMIN ONLY
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });

        }

        const admission =
            await Admission.findByIdAndDelete(
                req.params.id
            );

        if (!admission) {

            return res.status(404).json({
                success: false,
                message: "Admission not found"
            });

        }

        res.json({
            success: true,
            message: "Admission deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;