const { Schema, model } = require('mongoose')

const storeSchema = new Schema({
    store_name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    social_handle: {
        type: String
    },
    location_id: {
        type: Number,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

});

const storeModel = model("stores",storeSchema);

module.exports = storeModel;