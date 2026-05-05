
const userService = require('../services/user.service');

//get user profile controller
const getUserProfileController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userService.getUserProfileService(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        errorHandler(err);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }


}
//Edit User profile controller
const editUserProfileController = async (req, res) => {

    try {
        const userId = req.user._id; // 🔥 get user ID from req.user set in requireAuth middleware
        const user = await userService.editProfileService(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.userName = name || user.userName;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });
    } catch (err) {
        console.error(err);
        errorHandler(err);
        res.status(500).json({ message: 'Failed to update profile' });
    }
}

//get user specific cart data
const getCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartlist = await userService.getCartService(userId);
        res.status(201).json(cartList);

    } catch (err) {
        res.status(500).json({ message: err.message });

    }


}

// add user address controller
const addUserAddressController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userService.addUserAddressService(userId);
        res.status(200).json({
            message: "Address added successfully",
            address: user.address
        });
    } catch (err) {
        console.error(err);
        errorHandler(err);
        res.status(500).json({ message: 'Failed to add address' });
    }
}


module.exports = {
    getUserProfileController,
    editUserProfileController,
    getCartController,
    addUserAddressController
}