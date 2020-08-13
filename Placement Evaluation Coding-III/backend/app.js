var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var db =
  "mongodb+srv://user1:pass123@firstcluster.3tq5s.mongodb.net/booksDB?authSource=admin&replicaSet=atlas-2i6om5-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
// mongodb+srv://user1:pass123@firstcluster.3tq5s.mongodb.net/booksDB?authSource=admin&replicaSet=atlas-2i6om5-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
mongoose.connect(db);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var books = require("./routes/books");
app.use("/books", books);
var user = require("./routes/user");
app.use("/", user);

var port = 8002;
app.listen(port, function () {
  console.log("app listening on port: " + port);
});
