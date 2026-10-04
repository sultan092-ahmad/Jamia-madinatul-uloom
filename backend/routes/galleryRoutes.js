const adminMiddleware = require("../middleware/adminMiddleware");
const express = require("express");
const Gallery = require("../models/Gallery");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================
// GET ALL GALLERY ITEMS
// =====================================

router.get("/", async (req, res) => {
    try {

        const gallery = await Gallery.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            gallery
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================
// GET SINGLE GALLERY ITEM
// =====================================

router.get("/:id", async (req, res) => {
    try {

        const item = await Gallery.findById(
            req.params.id
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found"
            });
        }

        res.json({
            success: true,
            item
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================
// ADD GALLERY ITEM
// ADMIN ONLY
// =====================================

router.post("/", authMiddleware,adminMiddleware, async (req, res) => {
    try {

        const {
            title,
            image,
            description
        } = req.body;

        if (!title || !image) {
            return res.status(400).json({
                success: false,
                message: "Title and image are required"
            });
        }

        const galleryItem = await Gallery.create({
            title,
            image,
            description
        });

        res.status(201).json({
            success: true,
            message: "Gallery item added successfully",
            galleryItem
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================
// UPDATE GALLERY ITEM
// ADMIN ONLY
// =====================================

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {

        const galleryItem =
            await Gallery.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!galleryItem) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found"
            });
        }

        res.json({
            success: true,
            message: "Gallery item updated successfully",
            galleryItem
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================
// DELETE GALLERY ITEM
// ADMIN ONLY
// =====================================

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {

        const galleryItem =
            await Gallery.findByIdAndDelete(
                req.params.id
            );

        if (!galleryItem) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found"
            });
        }

        res.json({
            success: true,
            message: "Gallery item deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


module.exports = router;