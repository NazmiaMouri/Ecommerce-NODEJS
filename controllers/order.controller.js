
import orderService from "../services/order.service.js";
import { sendSuccess } from "../utils/responseHandler.js";



//CREATE ORDER CONTROLLER
const createOrderController = async (req, res) => {
    const { products, totalPrice, status } = req.body;

    const order = await orderService.createOrderService(req.user, products, totalPrice, status);
    sendSuccess(res, { statusCode: 200, message: 'order created successfully', data: { order } })

}

//GET USER ORDERS CONTROLLER
const getUserOrdersController = async (req, res) => {

    const orders = await orderService.getUserOrdersService(req.user);

    if (!orders || orders.length === 0) {
        sendSuccess(res, { statusCode: 200, message: 'NO order Found', data: { order } })
    } else {
        sendSuccess(res, { statusCode: 200, message: `${orders.length} orders found`, data: { orders } })

    }
}
export default {
    createOrderController,
    getUserOrdersController
};