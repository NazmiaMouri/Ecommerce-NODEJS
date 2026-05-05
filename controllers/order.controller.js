
const { createOrder, getUserOrders } = require('../services/order.service');



//CREATE ORDER CONTROLLER
const createOrderController = async (req, res) => {
    const { products, totalPrice, status } = req.body;
    try {
        const order = await createOrder(req.user, products, totalPrice, status);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//GET USER ORDERS CONTROLLER
const getUserOrdersController = async (req, res) => {
    try {
        const orders = await getUserOrders(req.user);
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
module.exports = {
    createOrderController,
    getUserOrdersController
};