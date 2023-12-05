const express = require('express')
const router = express.Router();
const restaurantsController = require('../controllers/restaurantsController')

router.route('/')
    .get(restaurantsController.getAllRestaurants);
    
router.route('/:id')
    .get(restaurantsController.getRestaurant);

router.route('/menus/:id')
    .get(restaurantsController.getMenu);

module.exports = router;