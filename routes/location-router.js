var express = require("express");
var router = express.Router();

//data from database
var locationModel = require("../models/location-model");

//get all locations
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all locations");
  const all_services = await locationModel.find({ is_deleted: false });
  res.json(all_services);
});

//create a new location
router.post("/", async function (req, res) {
  const new_service = new locationModel(req.body);
  try {
    console.log("[INFO] : Adding new location");
    const inserted = await new_service.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert location");
    else console.log("[INFO] : Success. Created location");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a location
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(req.body);
    req.body.updated_at = new Date();
    const response = await locationModel.findByIdAndUpdate(id, req.body);
    // if (!response) throw new Error("[ERROR] : --Failed to update");
    const updated = { ...response._doc, ...req.body };
    console.log("[INFO] : Success. Updated location");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    consoloe.log(error);
  }
});

//delete a location
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(req.body);
    req.body.updated_at = new Date();
    req.body.is_deleted = true;
    const deleted = await locationModel.findByIdAndUpdate(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete location");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular location
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await locationModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a location " + id);
    const service_details = { ...response._doc, ...req.body };
    res.status(200).json(service_details);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
