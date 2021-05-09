var express = require("express");
var router = express.Router();

//
router.get("/landing", async function (req, res) {
    res.render("../views/pages/landing");
});


router.get("/home", async function (req, res) {
    res.render("../views/pages/home");
});

router.get("/signin", async function (req, res) {
    res.render("../views/pages/signin");
});

router.get("/event-registration", async function (req, res) {
    res.render("../views/pages/event-registration");
});


router.get("/mo-dashboard", async function (req, res) {
    res.render("../views/pages/signin");
});


module.exports = router;
