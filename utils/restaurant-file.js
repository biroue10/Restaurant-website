const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname,"..","data", "restaurant.json");
function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);
    return storedRestaurant
}
function storeRestaurants(storablerestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storablerestaurants));
}
module.exports = {
    getStoredRestaurants:getStoredRestaurants,
    storeRestaurants:storeRestaurants
}