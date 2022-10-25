const mongoose = require("mongoose")

const collegeModel = new mongoose.schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Name already exist"],
        trim: true
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    logoLink: {
        type: String,
        required: [true, "Logo link is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("College", collegeModel)