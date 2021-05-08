var express = require("express");
var router = express.Router();

//data from database
var categoryModel = require("../models/category-model");

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
    request_body.updated_at = Date.now();
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
    request_body.updated_at = Date.now();
    request_body.is_deleted = true;
    const deleted = await categoryModel.findByIdAndDelete(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular category
router.put("/:id", async (req, res) => {
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

module.exports = router;
