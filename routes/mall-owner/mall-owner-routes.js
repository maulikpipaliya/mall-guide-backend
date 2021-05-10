var express = require("express");
var storeModel = require("../../models/store-model");

var router = express.Router();

router.get("/", async function (req, res) {
    res.redirect("/mo/mo-dashboard");
  });

router.get("/mo-dashboard", async function (req, res) {
  res.render("../views/pages/mall-owner/dashboard");
});

//get all stores
router.get("/manage-stores", async function (req, res) {
  console.log("[INFO] : Getting all stores");
  const all_stores = await storeModel.find({ is_deleted: false });
  res.render("../views/pages/mall-owner/manage-stores", {
    all_stores: all_stores
  });
});



router.get("/manage-services", async function (req, res) {
  all_services = {};
  res.render("../views/pages/mall-owner/manage-services", {
    all_services: all_services
  });
});


module.exports = router;