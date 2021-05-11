var express = require("express");
const categoryModel = require("./models/category-model");
const eventModel = require("./models/event-model");
const locationModel = require("./models/location-model");
const offerModel = require("./models/offer-model");
var router = express.Router();

router.get("/landing", async function (req, res) {
  res.render("../views/pages/landing");
});

// router.get("/home", async function (req, res) {
//   res.render("../views/pages/home");
// });

//user is always redirected to this page when not logged in. NOT LANDING
//LANDING PAGE IS ACCESSED ONLY THROUGH QR CODE.
router.get("/", async function (req, res) {
  res.redirect("/home");
});

// router.get("/", async function (req, res) {
//   res.render("../views/pages/addcategory");
// });

var storeModel = require("./models/store-model");
const storeOwnerModel = require("./models/store-owner-model");

router.get("/home", async function (req, res) {
  const all_stores = await storeModel.find({ is_deleted: false });

  for (let i = 0; i < all_stores.length; i++) {
    if (all_stores[i].location_id) {
      const locationId = await locationModel.findOne({
        _id: all_stores[i].location_id,
      });
      all_stores[i].block = locationId.block_name;
      all_stores[i].floor = locationId.floor_number;
    } else {
      all_stores[i].block = "A";
      all_stores[i].floor = "1";
    }
  }
  console.log("[INFO] : Getting all stores");
  // res.json(all_stores);
  console.log("[INFO] : Getting all events");
  const all_events = await eventModel.find({ is_deleted: false });
  const all_offers = await offerModel.find({ is_deleted: false });
  let flag = true;
  if (req.session.role && req.session.role == 2 && req.cookies.user_sid)
    flag = false;
  res.render("../views/pages/home", {
    all_stores: all_stores,
    all_events: all_events,
    offers: all_offers,
    flag: flag,
  });
});

var sessionChecker = (req, res, next) => {
  // console.log("keshav1111111 + " + req.session.user);
  if (req.session.user && req.session.role == 2 && req.cookies.user_sid) {
    res.redirect("/");
  } else {
    next();
  }
};
router.get("/signin", sessionChecker, async function (req, res) {
  res.render("../views/pages/signin");
});

router.get("/register-offers", async function (req, res) {
  res.render("../views/pages/offer-page");
});

router.get("/dine", async function (req, res) {
  res.render("../views/pages/dine");
});

router.get("/event-registration", async function (req, res) {
  res.render("../views/pages/event-registration");
});

router.get("/mo-dashboard", async function (req, res) {
  res.render("../views/pages/signin");
});

router.get("/mall-map", async function (req, res) {
  res.render("../views/pages/home-mall-map");
});

router.get("/store-request", async function (req, res) {
  res.render("../views/pages/store-request");
});

router.post("/store-request", async function (req, res) {
  const newStoreOwner = new storeOwnerModel(req.body);
  req.body.email = req.body.semail;
  let newStore = new storeModel(req.body);
  newStore.route_name = newStore.store_name.split(" ").join("-");

  const locationId = await locationModel.findOne({
    floor_number: parseInt(req.body.floor),
    block_name: req.body.block,
  });
  newStore.location_id = locationId._id;
  // res.status(200).json(newStore);
  newStore.save();
  newStoreOwner.save();
  res.redirect("/");
});

router.get("/store-ratings", async function (req, res) {
  const all_stores = await storeModel.find({ is_deleted: false });
  const all_category = await categoryModel.find({ is_deleted: false });
  res.render("../views/pages/store-owner/store-ratings", {
    all_stores: all_stores,
    all_category: all_category,
  });
});

module.exports = router;
