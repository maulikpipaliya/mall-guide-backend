var express = require("express");
var storeModel = require("../../models/store-model");
var locationModel = require("../../models/location-model");
var router = express.Router();

router.get("/", async function (req, res) {
  res.redirect("/mo/mo-dashboard");
});

router.get("/mo-dashboard", async function (req, res) {
  res.render("../views/pages/mall-owner/dashboard");
});

//get all stores
router.get("/manage-stores", async function (req, res) {
  const all_stores = await storeModel.find({ is_deleted: false });

  for (let i = 0; i < all_stores.length; i++) {
    const locationId = await locationModel.findOne({
      _id: all_stores[i].location_id,
    });
    all_stores[i].block = locationId.block_name;
    all_stores[i].floor = locationId.floor_number;
  }
  res.render("../views/pages/mall-owner/manage-stores", {
    all_stores: all_stores,
  });
});

module.exports = router;
