import cartService from "../services/cart.service.js";
import { sendSuccess } from "../utils/responseHandler.js";




//Add TO CART
const addToCartController = async (req, res) => {
 
    const cart = await cartService.addToCartService(req.user, req.body.productId, req.body.quantity);
    console.log('-----------------------------------------------------');
    console.log(cart);
     sendSuccess(res, { statusCode: 200, message: 'cart added succcessfully', data: { cart } });

  
};

//DELETE FROM CART
const deleteFromCartController = async (req, res) => {

  const user = await cartService.deleteFromCartService(req.body.productId, req.user);
  sendSuccess(res, { statusCode: 200, message: 'deleted succcessfully', data: { user } });



};
export default {
  addToCartController,
  deleteFromCartController
};