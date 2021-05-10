var express = require("express");
var router = express.Router();

//data from database
var store2CategoryModel = require("../models/store-2-category-model");

//get all store to categories
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all store to categories");
  const all_stores = await store2CategoryModel.find({ is_deleted: false });
  res.json(all_stores);
});

//create a new store-2-category
router.post("/", async function (req, res) {
  const newStore = new store2CategoryModel(req.body);
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

//update a store-2-category
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    req.body.updated_at = new Date();
    const response = await store2CategoryModel.findByIdAndUpdate(id, req.body);
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

//delete a store-2-category
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    req.body.updated_at = new Date();
    req.body.is_deleted = true;
    const deleted = await store2CategoryModel.findByIdAndUpdate(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular store-2-category
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await store2CategoryModel.findById(
      { store_id: id },
      req.body
    );
    if (!response)
      throw new Error("[ERROR] : Failed to get a store-2-category " + id);
    const categoryDetails = { ...response._doc, ...req.body };
    res.status(200).json(categoryDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
