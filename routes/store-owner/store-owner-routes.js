var express = require("express");

var router = express.Router();

router.get("/", async function(req, res) {
    res.redirect("/so/so-dashboard");
});

router.get("/so-dashboard", async function(req, res) {
    res.render("../views/pages/store-owner/store-owner-dashboard");
});

router.get("/so-store-request", async function(req, res) {
    res.render("../views/pages/store-owner/store-request");
});


module.exports = router;