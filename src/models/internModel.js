const mongoose = require("mongoose")
const ObjectId = mongoose.schema.type.ObjectId

const emailValidation = function (email) {
    let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(email)
}

const mobileValidation = function (mobile) {
    let regexForMobile = /^[6-9]\d{9}$/
    return regexForMobile.test(mobile)
}

const internModel = new mongoose.schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    mobile: {
        type: Number,
        unique: [true, "Mobile already registered"],
        require: [true, "Mobile number required"],
        validate: [mobileValidation, "Enter valid number"],
        trim: true
    },
    email: {
        type: String,
        unique: [true, "Email already registered"],
        require: [true, "Email id require"],
        validate: [emailValidation, "please enter a valid email"],
        trim: true
    },
    collegeId: {
        type: ObjectId,
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("Intern", internModel)
