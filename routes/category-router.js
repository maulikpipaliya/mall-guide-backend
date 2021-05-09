var express = require("express");
var router = express.Router();

//data from database
var categoryModel = require("../models/category-model");
var store2CategoryModel = require("../models/store-2-category-model");
var storeModel = require("../models/store-model");

//get all categories
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all categories");
  const all_stores = await categoryModel.find({ is_deleted: false });
  res.json(all_stores);
});

//create a new category
router.post("/", async function (req, res) {
  const newStore = new categoryModel(req.body);
  try {
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

//update a category
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.body.updated_at = new Date();
    const response = await categoryModel.findByIdAndUpdate(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to update");
    const updated = { ...response._doc, ...req.body };
    console.log("[INFO] : Success. Updated Data");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete a category
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.body.updated_at = new Date();
    res.body.is_deleted = true;
    const deleted = await categoryModel.findByIdAndUpdate(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular category
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await categoryModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a category " + id);
    const categoryDetails = { ...response._doc, ...req.body };
    res.status(200).json(categoryDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//Get stores of a particular category
router.get("/:id/stores", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await categoryModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a category " + id);
    const categoryDetails = { ...response._doc, ...req.body };
    console.log(response._id);
    const storeIds = await store2CategoryModel.find({
      category_id: id,
    });
    let store2CategoriesDetails = [];
    for (let i = 0; i < storeIds.length; i++) {
      const storeId = storeIds[i].store_id;
      const storeId1 = await storeModel.findOne({
        _id: storeId,
      });
      store2CategoriesDetails.push(storeId1);
    }
    res.status(200).json(store2CategoriesDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
