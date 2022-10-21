const mongoose = require("mongoose")

const collegeModel = new mongoose.schema({
    name: { type: String, require: "Name is required" },
    fullName: { type: String, require: "Full name is required" }
})

module.exports.collegeModel = collegeModel