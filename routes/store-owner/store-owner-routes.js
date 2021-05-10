var express = require("express");
var router = express.Router();
var categoryModel = require("../../models/category-model");
var offerModel = require("../../models/offer-model");

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

router.get("/so-edit-category", async function (req, res) {
  res.render("../views/pages/store-owner/edit-category");
});

router.get("/so-show-category", async function (req, res) {
  const all_offers = await offerModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/show-category",{all_offers:all_offers});
});

router.get("/so-add-offer", async function (req, res) {
  res.render("../views/pages/store-owner/add-offer");
});

router.get("/so-edit-offer", async function (req, res) {
  res.render("../views/pages/store-owner/edit-offer");
});

router.get("/so-show-offer", async function (req, res) {
  const all_offers = await offerModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/show-offer",{all_offers:all_offers});
});

router.get("/so-store-ratings", async function (req, res) {
  res.render("../views/pages/store-owner/store-ratings");
});

module.exports = router;