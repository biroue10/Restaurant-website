const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.get('/',function(req,res){
    const pathFile = path.join(__dirname,'views','index.html')
   res.sendFile(pathFile)
})
app.get('/about',function(req,res){
    const pathFile = path.join(__dirname,'views','about.html')
    res.sendFile(pathFile)
})
app.get('/confirm',function(req,res){
    const pathFile = path.join(__dirname,'views','confirm.html')
    res.sendFile(pathFile)
})
app.get('/recommend',function(req,res){
    const pathFile = path.join(__dirname,'views','recommend.html')
    res.sendFile(pathFile)
})
app.post('/recommend',function(req,res){
    const Restaurant = req.body
    // const Address = req.body.address
    // const Type_of_cuisine = req.body.cuisine
    // const Restaurant_website = req.body.website
    // const Why_do_you_recommend_it = req.body.description
    const filePath = path.join(__dirname,'data','restaurant.json')
    const fileData = fs.readFileSync(filePath)
    const storedRestaurant = JSON.parse(fileData)
    storedRestaurant.push(Restaurant)
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurant))
    res.redirect('/confirm')
})
app.get('/restaurants',function(req,res){
    const pathFile = path.join(__dirname, "views","restaurants.html")
    res.sendFile(pathFile)
})
app.listen(3000)