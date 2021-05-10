var express = require("express");
var router = express.Router();

//data from database
var serviceModel = require("../models/service-model");
var locationModel = require("../models/location-model");

//get all services
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all services");
  const all_services = await serviceModel.find({ is_deleted: false });
  res.json(all_services);
});

//create a new service
router.post("/", async function (req, res) {
  const new_service = new serviceModel(req.body);
  try {
    console.log("[INFO] : Adding new service");
    const inserted = await new_service.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert service");
    else console.log("[INFO] : Success. Created service");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a service
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(res.body);
    res.body.updated_at = new Date();
    const response = await serviceModel.findByIdAndUpdate(id, res.body);
    // if (!response) throw new Error("[ERROR] : --Failed to update");
    const updated = { ...response._doc, ...req.body };
    console.log("[INFO] : Success. Updated Service");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    consoloe.log(error);
  }
});

//delete a service
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(res.body);
    res.body.updated_at = new Date();
    res.body.is_deleted = true;
    const deleted = await serviceModel.findByIdAndUpdate(id, res.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete service");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular services
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await serviceModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a service " + id);
    const service_details = { ...response._doc, ...req.body };
    res.status(200).json(service_details);
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
        "[ERROR] : Failed to get a services at block " +
          block +
          " and floor numeber " +
          floor
      );
    // console.log(locationId);
    const servicesArray = await serviceModel.find({
      location_id: locationId._id,
    });
    res.status(200).json(servicesArray);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});




// MALL OWNER ---------------







module.exports = router;
