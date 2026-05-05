//addToCart
async function addToCartService(user, productId, quantity) {
    let cart = null;

    if (!user) throw new Error('User not found');
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

    await user.save(); // Implementation for adding product to cart

    return cart;
}

//Delete from cart
async function deleteFromCartService(productId, user) {


    if (!user) throw new Error('User not found');
    const index = user.cart.findIndex(item =>
        item.productId.toString() === productId
    );

    if (index > -1) {
        user.cart.splice(index, 1);
    } else {
        throw new Error('Product not found in cart');
    }

    await user.save(); // Implementation for adding product to cart
}
module.exports = {
    addToCartService,
    deleteFromCartService
};