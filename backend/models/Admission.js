const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true
        },

        fatherName: {
            type: String,
            required: true,
            trim: true
        },

        mobile: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            lowercase: true
        },

        program: {
            type: String,
            required: true,
            trim: true
        },

        dateOfBirth: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "New",
                "Contacted",
                "Approved",
                "Rejected"
            ],
            default: "New"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Admission",
    admissionSchema
);