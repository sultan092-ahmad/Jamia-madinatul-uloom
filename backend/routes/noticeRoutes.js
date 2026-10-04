const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const express = require("express");
const Notice = require("../models/Notice");

const router = express.Router();


// ===============================
// GET ALL NOTICES
// ===============================

router.get("/", async (req, res) => {

    try {

        const notices = await Notice
            .find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            notices: notices
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ===============================
// ADD NOTICE
// ===============================

router.post("/",authMiddleware,adminMiddleware,async (req, res) => {
    try {

        const {
            title,
            description,
            date
        } = req.body;


        if (!title || !description) {

            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });

        }


        const notice = new Notice({

            title: title,

            description: description,

            date: date || ""

        });


        await notice.save();


        res.status(201).json({

            success: true,

            message: "Notice added successfully",

            notice: notice

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// ===============================
// DELETE NOTICE
// ===============================

router.delete("/:id",authMiddleware,adminMiddleware,async (req, res) => {

    try {

        const notice =
            await Notice.findByIdAndDelete(
                req.params.id
            );


        if (!notice) {

            return res.status(404).json({

                success: false,

                message: "Notice not found"

            });

        }


        res.json({

            success: true,

            message: "Notice deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = router;