import Order from "../schemas & model/orderSchema.js";
import AppError from "../utils/AppError.js";

//CREATE ORDER
async function createOrderService(user, products, totalPrice, status) {
    return await Order.create({
        orderId: `ORD-${Date.now()}`,
        userId: user._id,
        products,
        totalPrice,
        status
    });


}

//GET USER ORDERS
async function getUserOrdersService(user) {
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const orders = await Order.find({
        userId: user._id
    })
        .populate("userId")
        .populate("products.productId");

    return orders;
}

export default {
    createOrderService,
    getUserOrdersService
}       