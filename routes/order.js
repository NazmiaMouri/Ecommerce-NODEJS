const express = require('express');
const app = express();
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { Order } = require('../schemas & model/orderSchema');
const cookieParser = require("cookie-parser");



const api = process.env.DEV_URL;
const errorHandler = require('../middleware/errorHandler');
const { User } = require('../schemas & model/userSchema');


// use middleware
app.use(cookieParser());
app.use(express.json())

//create order
router.post(`${api}/orders/create`, requireAuth, async (req, res) => {
    const { products, totalPrice, status } = req.body;

    try {
        const order = await Order.create({
            orderId: `ORD-${Date.now()}`,
            userId: req.user._id,
            products,
            totalPrice,
            status
        });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        errorHandler(err);
    }
})


// Get user orders
router.get(`${api}/orders`, requireAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('userId').populate('products.productId');
        res.status(201).json(orders);
    } catch (err) {
        console.error(err);
        errorHandler(err);

    }
})




module.exports = router;
