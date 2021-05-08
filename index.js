var express = require('express');
var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer();

var app = express();

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

var stores = require('./routes/stores');


//Use the Router on the sub route /movies
app.use('/stores', stores);

app.listen(3000);



