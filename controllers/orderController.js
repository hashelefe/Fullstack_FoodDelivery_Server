const data = {
    orders: require('../data/orders.json'),
    setOrders: function (data) { this.orders = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const uuid = require('uuid')

const createOrder = async (req,res) => {
    const orderId = uuid.v4();
    const newOrder = {
        orderId: orderId,
        username: req.body.user,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        info: req.body.info,
        value: req.body.value,
        products: req.body.products
    }
    try {
        data.setOrders([...data.orders, newOrder]);
        await fsPromises.writeFile(
            path.join(__dirname, '../', 'data', 'orders.json'),
            JSON.stringify(data.orders)
        );

        return res.status(201).json({ message: 'Order created successfully', orderId: orderId });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create order', error: error });
    }
}

const getAllOrders = async (req,res) => {
    res.json(data.orders);
}

module.exports = {createOrder, getAllOrders}