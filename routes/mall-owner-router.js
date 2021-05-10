var express = require("express");
var router = express.Router();

//data from database
var mallOwnerModel = require("../models/mall-owner-model");

//get all mall-owners
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all mall-owners");
  const all_services = await mallOwnerModel.find({ is_deleted: false });
  res.json(all_services);
});

//create a new mall-owner
router.post("/", async function (req, res) {
  const new_service = new mallOwnerModel(req.body);
  try {
    console.log("[INFO] : Adding new mall-owner");
    const inserted = await new_service.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert mall-owner");
    else console.log("[INFO] : Success. Created mall-owner");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a mall-owner
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(req.body);
    req.body.updated_at = new Date();
    const response = await mallOwnerModel.findByIdAndUpdate(id, req.body);
    // if (!response) throw new Error("[ERROR] : --Failed to update");
    const updated = { ...response._doc, ...req.body };
    console.log("[INFO] : Success. Updated mall-owner");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    consoloe.log(error);
  }
});

//delete a mall-owner
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(req.body);
    req.body.updated_at = new Date();
    req.body.is_deleted = true;
    const deleted = await mallOwnerModel.findByIdAndUpdate(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete mall-owner");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular mall-owner
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await mallOwnerModel.findById(id, req.body);
    if (!response)
      throw new Error("[ERROR] : Failed to get a mall-owner " + id);
    const service_details = { ...response._doc, ...req.body };
    res.status(200).json(service_details);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
