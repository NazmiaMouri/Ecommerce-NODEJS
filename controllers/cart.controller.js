const cartService = require('../services/cart.service');




//Add TO CART
const addToCartController = async (req, res) => {
  try {
    const cart = await cartService.addToCart(req.user, req.body.productId, req.body.quantity);
    console.log('-----------------------------------------------------');
    console.log(cart);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//DELETE FROM CART
const deleteFromCartController = async (req, res) => {
  try {
    const user = await cartService.deleteFromCart(req.body.productId, req.user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  addToCartController,
  deleteFromCartController
};