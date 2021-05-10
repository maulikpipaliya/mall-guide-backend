var express = require("express");
var router = express.Router();
var categoryModel = require("../../models/category-model");

router.get("/", async function (req, res) {
    res.redirect("/so/so-dashboard");
  });

router.get("/so-dashboard", async function (req, res) {
  res.render("../views/pages/store-owner/store-owner-dashboard");
});

router.get("/so-add-category", async function (req, res) {
  const all_categories = await categoryModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/add-category",{all_categories:all_categories});
});

router.get("/so-add-offer", async function (req, res) {
  res.render("../views/pages/store-owner/add-offer");
});


module.exports = router;