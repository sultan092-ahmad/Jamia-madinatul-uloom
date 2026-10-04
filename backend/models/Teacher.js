const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            required: true
        },

        qualification: {
            type: String,
            required: true
        },

        photo: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Teacher", teacherSchema);