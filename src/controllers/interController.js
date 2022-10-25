const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

const isValid = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false
    if (typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}

const createIntern = async function (req, res) {
    try {
        let internData = req.body

        if (Object.keys(internData).length === 0) { return res.status(400).send({ Status: false, msg: "Please provide intern data in body" }) };

        if (!isValid(internData.name)) { return res.status(401).send({ Status: false, msg: "Inter name is require" }) }
        if (!isValid(internData.mobile)) { return res.status(401).send({ Status: false, msg: "Mobile number is require" }) }
        if (!isValid(internData.email)) { return res.status(401).send({ Status: false, msg: "Email Id is require" }) }

        if (!/^[0]?[789]\d{9}$/.test(internData.mobile)) { res.status(401).send({ Status: false, msg: "Provide valid mobile number" }) }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(internData.email)) { res.status(401).send({ Status: false, msg: "Provide valid email id" }) }

        const isEmailUnique = await internModel.findOne({ email: internData.email })
        if (isEmailUnique) { return res.status(400).send({ Status: false, msg: "Email already registered" }) }

        const isMobileUnique = await internModel.findOne({ mobile: internData.mobile })
        if (isMobileUnique) { return res.status(400).send({ Status: false, msg: "Mobile already registered" }) }

        const collegeByCollegeName = await collegeModel.findOne({ name: internData.collegeName })
        if (!collegeByCollegeName) { return res.status(400).send({ status: false, msg: `no college found by this name: ${collegeName}` }) }

        let newIntern = internModel.create(internData);
        res.status(201).send({ status: true, msg: "New intern created", data: newIntern })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports.createIntern = createIntern
