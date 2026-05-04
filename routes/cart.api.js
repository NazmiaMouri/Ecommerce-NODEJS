const { requireAuth } = require("../middleware/authMiddleware");
const cartController = require("../controllers/cart.controller");

const express = require('express');
const router = express.Router();



const api = process.env.DEV_URL;

// POST /cart/add
router.post(`${api}/cart/add`,
    requireAuth, cartController.addToCart);

// POST /cart/remove
router.post(`${api}/cart/remove`,
    requireAuth, cartController.deleteFromCart);

module.exports = router;

// //Add to cart
// router.post('/cart/add', requireAuth,
//     async (req, res) => {


//         console.log(req.body.productId);
//         let cart = null;
//         try {
//             const productId = req.body.productId.id;
//             const quantity = req.body.quantity || 1;
//             console.log(productId, quantity);

//             const user = req.user; // 🔥 get user from req.user set in requireAuth middleware
//             if (!user) return res.status(404).json({ message: "User not found" });

//             console.log(user.cart[0]);
//             // check if product already in cart
//             const existingItem = user.cart.find(item =>
//                 item._id.toString() === productId
//             );

//             if (existingItem) {
//                 existingItem.quantity += quantity;
//             } else {
//                 cart = user.cart.push({
//                     productId,
//                     quantity
//                 });
//             }

//             await user.save();

//             res.status(200).json({
//                 message: "Added to cart successfully",
//                 cart: cart
//             });

//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     });

// //Delete from cart
// router.post('/cart/remove', requireAuth, async (req, res) => {
//     try {
//         const productId = req.body.productId._id;

//         const user = await User.findByIdAndUpdate(
//             req.user._id,
//             {
//                 $pull: {
//                     cart: { productId: productId }
//                 }
//             },
//             { new: true }
//         ).populate('cart.productId');

//         res.status(200).json({
//             message: "Item removed from cart",
//             cart: user.cart
//         });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });