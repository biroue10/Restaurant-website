const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");
const restData = require('./utils/restaurant-file')
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
  const storedRestaurant = restData.getStoredRestaurants()
  storedRestaurant.push(Restaurant);
  restData.storeRestaurants(storedRestaurant)
  res.redirect("/confirm");
});
app.get("/restaurants", function (req, res) {
  const storedRestaurant = restData.getStoredRestaurants()
  res.render("restaurants", {
    numberOfrestaurants: storedRestaurant.length,
    restaurants: storedRestaurant,
  });
});
app.get("/restaurants/:id", function (req, res) {
  const restaurantID = req.params.id;
  const storedRestaurant = restData.getStoredRestaurants()
  for (const restaurant of storedRestaurant){
    if(restaurant.id===restaurantID){
      return res.render("restaurants-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render('404')

});
app.use(function(req,res){
  res.status(404).render('404')
})
app.use(function(error,req,res,next){
  res.status(500).render('500')
})
app.listen(3000);
