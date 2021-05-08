var express = require('express');
var router = express.Router();


//data from database
var stores = require('./data/stores.json');


router.get('/', function (req, res) {
    res.json(stores);
});


router.get('/:id([0-9]{3,})', function (req, res) {
    var currStore= stores.filter(function (store) {
        if (store.id == req.params.id) {
            return true;
        }
    });
    if (currStore.length == 1) {
        res.json(currStore[0])
    } else {
        res.status(404);//Set status to 404 as movie was not found
        res.json({ message: "Not Found" });
    }
});

module.exports = router;