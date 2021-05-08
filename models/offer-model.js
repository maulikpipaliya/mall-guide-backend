const { Schema, model } = require('mongoose')

const offerSchema = new Schema({
    offer_name: {
        type: String,
        required: true
    },
    offer_by: {
        type: String
    },
    duration: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    }


});

const storeModel = model("offers",offerSchema);

module.exports = storeModel;

