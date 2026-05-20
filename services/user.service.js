import  User  from "../schemas & model/userSchema.js";

//get user profile
async function getUserProfileService(userId) {
    
      return await User.findById(userId);

  

}
// Edit Profile
async function editProfileService(userId, updateData) {

    // remove restricted fields
    delete updateData.password;
    delete updateData.role;

    // optional sanitization
    if (updateData.email) {
        updateData.email = updateData.email.trim().toLowerCase();
    }

    if (updateData.userName) {
        updateData.userName = updateData.userName.trim();
    }

    // check duplicate email
    if (updateData.email) {
        const existingUser = await User.findOne({
            email: updateData.email,
            _id: { $ne: userId }
        });

        if (existingUser) {
            const error = new Error('Email already in use');
            error.statusCode = 409;
            throw error;
        }
    }

    // PATCH update
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    ).select('-password');

    if (!updatedUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return updatedUser;
}

//get user specific cart data
async function getCartService(userId) {
   return await User.find({ userId: userId }).populate('products.productId');
    
}

//add user delivery address
async function addUserAddressService(userId, address) {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { address } },
        { new: true, runValidators: true }
    );
}
export default {
    getUserProfileService,
    editProfileService,
    getCartService,
    addUserAddressService
}