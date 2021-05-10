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
    
    if (all_stores[i].location_id) {   
      const locationId = await locationModel.findOne({
        _id: all_stores[i].location_id,
      });
      all_stores[i].block = locationId.block_name;
      all_stores[i].floor = locationId.floor_number;
    }
    else {
      all_stores[i].block = "A";
      all_stores[i].floor = "1"
      
    }
  }
  res.render("../views/pages/mall-owner/manage-stores", {
    all_stores: all_stores,
  });

  all_services = {};
  res.render("../views/pages/mall-owner/manage-services", {
    all_services: all_services,
  });
});


router.get("/manage-stores/edit-store/:name", async (req, res) => {
  const { name } = req.params;
  try {
    console.log(name);
    const storeObj = await storeModel.findOne({ route_name: name });
    if (!storeObj) throw new Error("[ERROR] : Failed to get a store " + name);
    const storeDetails = { ...storeObj._doc, ...req.body };
    res.render("../views/pages/mall-owner/edit-store", {
      storeDetails: storeDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



router.get("/manage-stores/add-store", async function (req, res) {
  // let newStore = new storeModel(req.body);
  try {
    res.render("../views/pages/mall-owner/add-store");
    // newStore.route_name = newStore.store_name.split(" ").join("-");
    // const inserted = await newStore.save();
    // if (!inserted) throw new Error("[ERROR] : Failed to insert");
    // else console.log("[INFO] : Success. Inserted Data");
    // res.status(200).json(inserted);
    // res.render("/mo/manage-stores");

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



module.exports = router;
