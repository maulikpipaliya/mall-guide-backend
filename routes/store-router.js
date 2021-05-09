var express = require("express");
var router = express.Router();

//data from database
var storeModel = require("../models/store-model");
var categoryModel = require("../models/category-model");
var store2CategoryModel = require("../models/store-2-category-model");
var ratingModel = require("../models/rate-model");
var locationModel = require("../models/location-model");

//random
router.get("/haha", async function (req, res) {
  res.render("../views/pages/landing");
});

//get all stores
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all stores");
  const all_stores = await storeModel.find({ is_deleted: false });
  res.json(all_stores);
});

//create a new store
router.post("/", async function (req, res) {
  let newStore = new storeModel(req.body);
  try {
    newStore.route_name = newStore.store_name.split(" ").join("-");
    const inserted = await newStore.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert");
    else console.log("[INFO] : Success. Inserted Data");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a store
router.put("/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const response = await storeModel.find({ route_name: name });
    response.updated_at = new Date();
    const response1 = await storeModel.findByIdAndUpdate(response.id, req.body);
    if (!response1) throw new Error("[ERROR] : Failed to update");
    const updated = { ...response1._doc, ...req.body };
    console.log("[INFO] : Success. Updated Data");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete a store
router.delete("/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const response = await storeModel.findOne({ route_name: name });
    response.updated_at = new Date();
    response.is_deleted = true;
    // console.log(response);
    const deleted = await storeModel.findByIdAndUpdate(response.id, response);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular stores
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    console.log(name);
    const storeObj = await storeModel.findOne({ route_name: name });
    if (!storeObj) throw new Error("[ERROR] : Failed to get a store " + name);
    const storeDetails = { ...storeObj._doc, ...req.body };
    res.status(200).json(storeDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get categories of particular stores
router.get("/:name/categories", async (req, res) => {
  const { name } = req.params;
  try {
    // console.log(name);
    const storeObj = await storeModel.findOne({ route_name: name });
    if (!storeObj) throw new Error("[ERROR] : Failed to get a store " + name);
    const categoriesId = await store2CategoryModel.find({
      store_id: storeObj._id,
    });
    let store2CategoriesDetails = [];
    for (let i = 0; i < categoriesId.length; i++) {
      const categoryId = categoriesId[i].category_id;
      const categoryObj = await categoryModel.findOne({
        _id: categoryId,
      });
      // console.log(categoryId);
      // console.log(categoryObj);
      store2CategoriesDetails.push(categoryObj);
    }
    res.status(200).json(store2CategoriesDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get ratings of particular stores
router.get("/:name/rating", async (req, res) => {
  const { name } = req.params;
  try {
    // console.log(name);
    const storeObj = await storeModel.findOne({ route_name: name });
    if (!storeObj) throw new Error("[ERROR] : Failed to get a store " + name);
    const ratingsArray = await ratingModel.find({
      store_id: storeObj._id,
    });
    // let store2CategoriesDetails = [];
    // for (let i = 0; i < ratingsArray.length; i++) {
    //   const categoryId = ratingsArray[i].category_id;
    //   const categoriesId1 = await categoryModel.findOne({
    //     _id: categoryId,
    //   });
    //   console.log(categoryId);
    //   console.log(categoriesId1);
    //   store2CategoriesDetails.push(categoriesId1);
    // }
    res.status(200).json(ratingsArray);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get all the store of particular block and floor number
router.get("/:block/:floor", async (req, res) => {
  const { block, floor } = req.params;
  try {
    // console.log(block);
    // console.log(floor);
    const locationId = await locationModel.findOne({
      floor_number: parseInt(floor),
      block_name: block,
    });
    if (!locationId)
      throw new Error(
        "[ERROR] : Failed to get a stores at block " +
          block +
          " and floor numeber " +
          floor
      );
    // console.log(locationId);
    const storesArray = await storeModel.find({
      location_id: locationId._id,
    });
    res.status(200).json(storesArray);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
