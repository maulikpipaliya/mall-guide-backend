var port = 4000;
var mongoose = require("mongoose");


var uri = "mongodb+srv://keshav:keshav@mall-guide.baihe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
mongoose.connect();


const  addschema = new mongoose.Schema({
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
    }
    });

const modelnew = new mongoose.model("store",addschema);

const newrecord =new modelnew({
    store_name: "hellocomapnay",
    email:"hello@gmail.com",
    social_handle: "instahl",
    location_id: 10,
    is_deleted: false
    })
    newrecord.save();