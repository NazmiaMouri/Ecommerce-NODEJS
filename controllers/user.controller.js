
import userService from "../services/user.service.js";
import { sendSuccess } from "../utils/responseHandler.js";

//get user profile controller
const getUserProfileController = async (req, res) => {

    const userId = req.user._id;
    const user = await userService.getUserProfileService(userId);
    if (!user) throw new AppError("No user found", 401);



    sendSuccess(res, {
        message: 'Profile fetched successfully',
        data: { user }
    });



}
//Edit User profile controller
const editUserProfileController = async (req, res) => {


    const userId = req.user._id; // 🔥 get user ID from req.user set in requireAuth middleware
    const updateData = req.body;
    const user = await userService.editProfileService(userId, updateData);
    if (!user) throw new AppError("No user found", 401);



    sendSuccess(res, {
        message: "Profile updated successfully",
        data: { user }
    });

}

    //get user specific cart data
    const getCartController = async (req, res) => {

        const userId = req.user._id;
        const cartlist = await userService.getCartService(userId);
        sendSuccess(res, {
            message: "Cart fetched successfully",
            data: { cartlist }
        });


    }

    // add user address controller
    const addUserAddressController = async (req, res) => {

        const userId = req.user._id;
        const user = await userService.addUserAddressService(userId);
        sendSuccess(res, {
            message: "Address added successfully",
            data: { address: user.address }
        });
    }


    export default {
        getUserProfileController,
        editUserProfileController,
        getCartController,
        addUserAddressController
    }