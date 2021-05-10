var express = require("express");
var router = express.Router();
var categoryModel = require("../../models/category-model");
var offerModel = require("../../models/offer-model");
var storeModel = require("../../models/store-model");

router.get("/", async function (req, res) {
  res.redirect("/so/so-dashboard");
});

router.get("/so-dashboard", async function (req, res) {
  // console.log("Session + ");
  // console.log(req.session);
  if (req.session.user && req.session.role != 1) res.redirect("/");
  res.render("../views/pages/store-owner/store-owner-dashboard", {
    user: req.session.user,
  });
});

router.get("/so-store-request", async function (req, res) {
  res.render("../views/pages/store-owner/store-request");
});

router.get("/so-add-category", async function (req, res) {
  const all_categories = await categoryModel.find({ is_deleted: false });

  res.render("../views/pages/store-owner/add-category", {
    all_categories: all_categories,
  });
});

router.get("/so-edit-category/:id", async function (req, res) {
  const { id } = req.params;
  const response = await categoryModel.findByIdAndUpdate(id, req.body);
  const all_categories = await categoryModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/edit-category", {
    all_category: response,
    all_categories: all_categories,
  });
});

router.get("/so-show-category", async function (req, res) {
  const all_category = await categoryModel.find({ is_deleted: false });
  for (let i = 0; i < all_category.length; i++) {
    const tmp = await categoryModel.findOne({
      _id: all_category[i].parent_category_id,
    });
    if (tmp) all_category[i].parent_category_id = tmp.name;
  }
  res.render("../views/pages/store-owner/show-category", {
    all_category: all_category,
  });
});

router.get("/so-add-offer", async function (req, res) {
  res.render("../views/pages/store-owner/add-offer");
});

router.get("/so-edit-offer/:id", async function (req, res) {
  const { id } = req.params;
  const response = await offerModel.findByIdAndUpdate(id, req.body);
  res.render("../views/pages/store-owner/edit-offer", { all_offers: response });
});

router.get("/so-show-offer", async function (req, res) {
  const all_offers = await offerModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/show-offer", {
    all_offers: all_offers,
  });
});

router.get("/so-store-ratings", async function (req, res) {
  const all_stores = await storeModel.find({ is_deleted: false });
  const all_category = await categoryModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/store-ratings", {
    all_stores: all_stores,
    all_category: all_category,
  });
});

module.exports = router;
