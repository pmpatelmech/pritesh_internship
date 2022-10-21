const internModel = require("../models/internModel")

const createIntern = (req, res) => {
    try {
        let interData = req.body

        if (!interData.name) { res.status(401).send("Inter name is require") }
        if (!interData.mobile) { res.status(401).send("Mobile number is require") }
        if (!interData.email) { res.status(401).send("Email Id is require") }

        if (!/^[0]?[789]\d{9}$/.test(interData.mobile)) { res.status(401).send("Provide valid mobile number") }
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(interData.email)) { res.status(401).send("Provide valid email id") }



    } catch (error) {
        console.log(error)
    }
}
