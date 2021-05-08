const { Schema, model } = require('mongoose')

const storeSchema = new Schema({
    store_name: {
        type: String
    },
    email: {
        type: String
    },
    social_handle: {
        type: String
    },
    location_id: {
        type: Number
    },
    is_deleted: {
        type: Boolean
    },
    created_at: {
        type: Date,
        default: Date.now  
    }
});

const storeModel = model("store",storeSchema);

module.exports = storeModel;