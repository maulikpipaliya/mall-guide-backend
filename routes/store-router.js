var express = require("express");
var router = express.Router();

//data from database
var storeModel = require("../models/store-model");

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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    request_body.updated_at = Date.now();
    request_body.is_deleted = true;
    const deleted = await storeModel.findByIdAndUpdate(id, req.body);
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
    const response = await storeModel.find({ route_name: name });
    if (!response) throw new Error("[ERROR] : Failed to get a store " + name);
    const storeDetails = { ...response._doc, ...req.body };
    res.status(200).json(storeDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
