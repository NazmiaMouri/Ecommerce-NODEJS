import express from "express";
const app = express();
const router = express.Router();
import { requireAuth } from "../middleware/authMiddleware.js";
import  Order  from "../schemas & model/orderSchema.js";
import cookieParser from "cookie-parser";
import ordersController from "../controllers/order.controller.js";



//import errorHandler from "../middleware/errorHandler.js";
import  User from "../schemas & model/userSchema.js";
import { api } from "../utils/environment_variables.js";


// use middleware
app.use(cookieParser());
app.use(express.json())


//create order
router.post(`${api}/orders/create`, requireAuth, ordersController.createOrderController);

// Get user orders
router.get(`${api}/orders`, requireAuth, ordersController.getUserOrdersController);

// //create order
// router.post(`${api}/orders/create`, requireAuth, async (req, res) => {
//     const { products, totalPrice, status } = req.body;

//     try {
//         const order = await Order.create({
//             orderId: `ORD-${Date.now()}`,
//             userId: req.user._id,
//             products,
//             totalPrice,
//             status
//         });

//         res.status(201).json(order);
//     } catch (err) {
//         console.error(err);
//         errorHandler(err);
//     }
// })


// // Get user orders
// router.get(`${api}/orders`, requireAuth, async (req, res) => {
//     try {
//         const orders = await Order.find({ userId: req.user._id }).populate('userId').populate('products.productId');
//         res.status(201).json(orders);
//     } catch (err) {
//         console.error(err);
//         errorHandler(err);

//     }
// })




export default router;
