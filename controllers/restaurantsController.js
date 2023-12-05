const data = {
    restaurants: require('../data/restaurants.json'),
    setRestaurants: function(data) {this.restaurants = data}
}

//Getting list of all restaurants 
const getAllRestaurants = (req,res) => {
    res.json(data.restaurants);
  };
  
  
  //Getting informations about concrete restaurant
const getRestaurant = (req,res) => {
    const restaurantId = req.params.id;
    const restaurant = data.restaurants.find((e) => e.id === restaurantId)
    res.json(restaurant);
};
  
  
  //Getting menu of concrete restaurant
const getMenu = (req, res) => {
    const restaurantId = req.params.id;
    const dishes = require("../data/menus.json");
    const menuData = dishes.menus.find((element) => element.restaurant_id === restaurantId);
  
    if (!menuData) {
      return res.status(404).json({ message: "Restaurant id not found" });
    }
    res.json(menuData);
  };

  module.exports = { getAllRestaurants, getMenu, getRestaurant}