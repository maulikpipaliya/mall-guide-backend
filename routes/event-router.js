var express = require('express');
var router = express.Router();


//data from database
var events = require('./data/events.json');


router.get('/', function (req, res) {
    res.json(events);
});


router.get('/:id([0-9]{3,})', function (req, res) {
    var currEvent= events.filter(function (store) {
        if (store.id == req.params.id) {
            return true;
        }
    });
    if (currEvent.length == 1) {
        res.json(currEvent[0])
    } else {
        res.status(404);//Set status to 404 as movie was not found
        res.json({ message: "Not Found" });
    }
});

module.exports = router;