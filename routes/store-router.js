var express = require('express');
var router = express.Router();

//data from database
var storeModel = require('../models/store-model');

//get all stores
router.get('/', async function (req, res) {
    const all_stores = await storeModel.find();
    res.json(all_stores);
});


//insert a store
router.post('/', async function (req, res) {
    const newStore = new storeModel(req.body);
    try {
        const inserted = await newStore.save();
        if (!inserted) throw new Error("[ERROR] : Failed to insert");
        res.status(200).json(inserted);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

//update a store
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await storeModel.findByIdAndUpdate(id, req.body);
        if (!response) throw new Error("[ERROR] : Failed to update");
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

//delete a store
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await storeModel.findByIdAndDelete(id, req.body);
        if (!deleted) throw new Error("[ERROR] : Failed to delete");

        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;