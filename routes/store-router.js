var express = require("express");
var router = express.Router();

//data from database
var storeModel = require("../models/store-model");
var categoryModel = require("../models/category-model");
var store2CategoryModel = require("../models/store-2-category-model");

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
    newStore.route_name = newStore.store_name.replaceAll(" ", "-");
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
    response.updated_at = Date.now();
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
    response.updated_at = Date.now();
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
    const response = await storeModel.findOne({ route_name: name });
    if (!response) throw new Error("[ERROR] : Failed to get a store " + name);
    const storeDetails = { ...response._doc, ...req.body };
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
    const response = await storeModel.findOne({ route_name: name });
    if (!response) throw new Error("[ERROR] : Failed to get a store " + name);
    const categoriesId = await store2CategoryModel.find({
      store_id: response._id,
    });
    let store2CategoriesDetails = [];
    for (let i = 0; i < categoriesId.length; i++) {
      const categoryId = categoriesId[i].category_id;
      const categoriesId1 = await categoryModel.findOne({
        _id: categoryId,
      });
      console.log(categoryId);
      console.log(categoriesId1);
      store2CategoriesDetails.push(categoriesId1);
    }
    res.status(200).json(store2CategoriesDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
