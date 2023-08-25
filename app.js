const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/confirm", function (req, res) {
  res.render("confirm");
});
app.get("/recommend", function (req, res) {
  res.render("recommend");
});
app.post("/recommend", function (req, res) {
  const Restaurant = req.body;
  Restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, "data", "restaurant.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurant = JSON.parse(fileData);
  storedRestaurant.push(Restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurant));
  res.redirect("/confirm");
});
app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurant.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurant = JSON.parse(fileData);
  res.render("restaurants", {
    numberOfrestaurants: storedRestaurant.length,
    restaurants: storedRestaurant,
  });
});
app.get("/restaurants/:id", function (req, res) {
  const restaurantID = req.params.id;
  const filePath = path.join(__dirname, "data", "restaurant.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurant = JSON.parse(fileData);
  for (const restaurant of storedRestaurant){
    if(restaurant.id===restaurantID){
      return res.render("restaurants-detail", { restaurant: restaurant });
    }
  }
  res.render('404')

});
app.use(function(req,res){
  res.render('404')
})
app.use(function(error,red,res,next){
  res.render('500')
})
app.listen(3000);
