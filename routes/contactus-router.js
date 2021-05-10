var express = require("express");
var router = express.Router();

//
router.get("/", async function (req, res) {
    res.render("../views/pages/contactus");
});



module.exports = router;
