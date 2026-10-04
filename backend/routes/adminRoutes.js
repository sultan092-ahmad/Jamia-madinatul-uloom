const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Admin Dashboard 🔐",
        admin: req.user
    });
});

module.exports = router;