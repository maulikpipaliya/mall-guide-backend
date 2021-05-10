var express = require("express");

var router = express.Router();

router.get("/", async function (req, res) {
    res.redirect("/mo/mo-dashboard");
  });

router.get("/mo-dashboard", async function (req, res) {
  res.render("../views/pages/mall-owner/dashboard");
});

router.get("/manage-stores", async function (req, res) {
  res.render("../views/pages/mall-owner/manage-stores");
});


module.exports = router;