var express = require("express");
var router = express.Router();

//data from database
var eventModel = require("../models/event-model");

//get all events
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all events");
  const all_events = await eventModel.find();
  res.json(all_events);
});

//create a new event
router.post("/", async function (req, res) {
  const newStore = new eventModel(req.body);
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

//update a event
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await eventModel.findByIdAndUpdate(id, req.body);
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

//delete a event
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await eventModel.findByIdAndDelete(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular events
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await eventModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a event " + id);
    const storeDetails = { ...response._doc, ...req.body };
    res.status(200).json(storeDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
