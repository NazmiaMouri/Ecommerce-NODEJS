const express = require('express');
const app = express();
const router = express.Router();
const { requireAuth } = require("../../middleware/authMiddleware");
const { Order } = require('../../schemas & model/orderSchema');
const cookieParser = require("cookie-parser");



const api = process.env.DEV_URL;
const errorHandler = require('../../middleware/errorHandler');

const express = require('express');

// use middleware
app.use(cookieParser());
app.use(express.json())


router.post(`${api}/placeorder`, requireAuth, async (req, res) => {
    const { userId, products, totalPrice } = req.body;

    try {
        const order = await Order.create({
            orderId: `ORD-${Date.now()}`,
            userId,
            products,
            totalPrice
        });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        errorHandler(err);
    }
})



router.get(`${api}/orders`, requireAuth, async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId');
        res.status(201).json(orders);
    } catch (err) {
        console.error(err);
        errorHandler(err);

    }
})

module.exports = router;
