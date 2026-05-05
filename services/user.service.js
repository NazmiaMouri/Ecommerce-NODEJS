const { User } = require('../schemas & model/userSchema');

//get user profile
async function getUserProfileService(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('No User Found');

    } catch (err) {
        throw new Error(err);
    }

}
// Edit Profile
async function editProfileService(updatedUser) {


    const user = await User.findById(updatedUser._id);

    if (!user) {
        throw new Error('User not found');
    }

    // update only if provided
    user.userName = updatedUser.userName;
    user.email = updatedUser.email;


    await user.save();

    return user
};

//get user specific cart data
async function getCartService(userId) {
    try {
        const cartList = await User.find({ userId: userId }).populate('products.productId');
        return cartList;
    } catch (err) {
        throw new Error(err);
    }

}

//add user delivery address
async function addUserAddressService(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('No User found');

        user.address.push(address);
        await user.save();
        return user;
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = {
    getUserProfileService,
    editProfileService,
    getCartService,
    addUserAddressService
}