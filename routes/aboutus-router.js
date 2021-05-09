var express = require("express");
var router = express.Router();

//
router.get("/", async function (req, res) {
    res.render("../views/pages/aboutus");
});



module.exports = router;
