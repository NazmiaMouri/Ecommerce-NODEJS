//create order service
const { Order } = require('../schemas & model/orderSchema');

//CREATE ORDER
async function createOrderService(user, products, totalPrice, status) {
    try {
        const order = await Order.create({
            orderId: `ORD-${Date.now()}`,
            userId: user._id,
            products,
            totalPrice,
            status
        });
        return order;
    } catch (err) {
        throw new Error(err);
    }
}

//GET USER ORDERS
async function getUserOrdersService(user) {
    try {
        const orders = await Order.find({ userId: user._id }).populate('userId').populate('products.productId');
        return orders;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    createOrderService,
    getUserOrdersService
}       