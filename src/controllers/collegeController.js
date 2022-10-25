const collegeModel = require("../models/collegeModel")

const isValid = function (value) {
    if (typeof (value) == undefined || typeof (value) == null) return false;
    if (typeof (value) == String && value.trim().length === 0) return false;
    return true
}

const createCollege = async function (req, res) {
    try {
        let inputCollegeData = req.body
        let inputQuery = req.query

        if (Object.keys(inputCollegeData).length === 0) { return res.status(400).send({ Status: false, msg: "Provide college data in body" }) }

        if (!isValid(inputCollegeData.name)) { return res.status(400).send({ Status: false, msg: "Please provide college name" }) }
        if (!isValid(inputCollegeData.fullName)) { return res.status(400).send({ Status: false, msg: "Please provide college full name" }) }
        if (!isValid(inputCollegeData.logoLink)) { return res.status(400).send({ Status: false, msg: "Please provide logo link" }) }

        if (!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(inputCollegeData.logoLink))) {
            return res.status(400).send({ Status: false, msg: "Please provide valid logo link" })
        }

        const collegeAlreadyRegistered = await collegeModel.findOne({
            name: inputCollegeData.name,
            isDeleted: false
        });

        if (collegeAlreadyRegistered) {
            return res.status(400).send({ Status: false, msg: "college is already registered" });
        }
        const logoLinkAlreadyUsed = await collegeModel.findOne({ logoLink: inputCollegeData.logoLink })
        if (logoLinkAlreadyUsed) { return res.status(400).send({ Status: false, msg: "Logo link is already used" }) }

        let newCollege = await collegeModel.create(inputCollegeData);
        res.status(201).send({ Status: true, msg: "New college created", Data: newCollege })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const collegeDetail = async function (req, res) {
    try {
        let collegeName = req.query;
        let inputBody = req.body;

        if (Object.keys(inputBody).length > 0)
            return res.status(400).send({ Status: false, msg: "Input in body is not valid, Provide college name in query params instead of body" })

        if (!isValid(collegeName.name))
            return res.status(400).send({ Status: false, msg: "Valid college name is required in query params" })

        let isCollegeNameAvailable = await collegeModel.findOne({
            name: collegeName.name,
            isDeleted: false
        })

        let selectedCollegeDetails = await collegeModel.findOne({
            name: collegeName.name,
            isDeleted: false
        }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })

        if (!isCollegeNameAvailable)
            return res.status(400).send({ Status: false, msg: "No such college is registered" });

        const getInternsByCollegeID = await internModel.find({ collegeId: selectedCollegeDetails._id }).select({ _id: 1, email: 1, name: 1, mobile: 1 })

        res.status(200).send({ status: true, data: getInternsByCollegeID })


    } catch (error) {
        res.status(500).send({ error: error.message })
    }

}

module.exports.createCollege = createCollege
module.exports.collegeDetail = collegeDetail