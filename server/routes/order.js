const express = require('express');
const app = express();
const router = express.Router();
const { requireAuth } = require("../../middleware/authMiddleware");
const { Order } = require('../../schemas & model/orderSchema');
const cookieParser = require("cookie-parser");



const api = process.env.DEV_URL;
const errorHandler = require('../../middleware/errorHandler');
const { User } = require('../../schemas & model/userSchema');


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



// POST /cart/add
router.post(`${api}/cart/add`,
    requireAuth, async (req, res) => {
        console.log(req.body.productId);
        let cart = null;
        try {
            const productId = req.body.productId.id;
            const quantity = req.body.quantity || 1;
            console.log(productId, quantity);

            const user = req.user; // 🔥 get user from req.user set in requireAuth middleware
            if (!user) return res.status(404).json({ message: "User not found" });

            console.log(user.cart[0]);
            // check if product already in cart
            const existingItem = user.cart.find(item =>
                item._id.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart = user.cart.push({
                    productId,
                    quantity
                });
            }

            await user.save();

            res.status(200).json({
                message: "Added to cart successfully",
                cart: cart
            });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

//Delete from cart
router.post('/cart/remove', requireAuth, async (req, res) => {
    try {
        const productId = req.body.productId._id;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: {
                    cart: { productId: productId }
                }
            },
            { new: true }
        ).populate('cart.productId');

        res.status(200).json({
            message: "Item removed from cart",
            cart: user.cart
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
