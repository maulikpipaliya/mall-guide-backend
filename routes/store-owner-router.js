var express = require("express");
var router = express.Router();

//data from database
var storeOwnerModel = require("../models/store-owner-model");

//get all store owners
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all the store owners");
  const all_services = await storeOwnerModel.find({ is_deleted: false });
  res.json(all_services);
});

//create a new store-owner
router.post("/", async function (req, res) {
  const new_service = new storeOwnerModel(req.body);
  try {
    console.log("[INFO] : Adding new store-owner");
    const inserted = await new_service.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert store-owner");
    else console.log("[INFO] : Success. Created store-owner");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a store-owner
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(res.body);
    res.body.updated_at = Date.now();
    const response = await storeOwnerModel.findByIdAndUpdate(id, res.body);
    // if (!response) throw new Error("[ERROR] : --Failed to update");
    const updated = { ...response._doc, ...req.body };
    console.log("[INFO] : Success. Updated store-owner");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    consoloe.log(error);
  }
});

//delete a store-owner
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(res.body);
    res.body.updated_at = Date.now();
    res.body.is_deleted = true;
    const deleted = await storeOwnerModel.findByIdAndUpdate(id, res.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete store-owner");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular store owners
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await storeOwnerModel.findById(id, req.body);
    if (!response)
      throw new Error("[ERROR] : Failed to get a store-owner " + id);
    const service_details = { ...response._doc, ...req.body };
    res.status(200).json(service_details);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
