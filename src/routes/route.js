const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/interController")

router.get('/test', function (req, res) {
    res.status(200).send({ status: true, message: "test api working fine" })
})

router.post('/colleges', collegeController.createCollege)

router.post('/intern', internController.createIntern)

router.get('/collegeDetails', collegeController.collegeDetail)

module.exports = router;