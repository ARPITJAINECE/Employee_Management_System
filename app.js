//import library
const express = require("express");
const app = express();
var path = require("path");//to use ejs files
const bodyparser = require("body-parser");
const routes = require("./router/routers");

//add middleware
app.use(bodyparser.urlencoded({ extended: false }));

//configure the project
app.set("views", path.join(__dirname, "views"));

//setting the view engine
app.set("view engine", "ejs");
//to set all static files
app.set(express.static(path.join(__dirname, "public")));
//to find all static js,css and images
app.use("/js", express.static(path.resolve(__dirname, "public/js")));
app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/image", express.static(path.resolve(__dirname, "public/image")));

//add url holders
app.use("/", routes);

//start server
app.listen(3005, function (req, resp) {
    console.log("server started at port 3005");
});

//exporting the app module to use in routers.js
module.exports = app;