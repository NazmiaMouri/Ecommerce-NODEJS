const express = require('express');

const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { Order } = require('../schemas & model/orderSchema');
const cookieParser = require("cookie-parser");


const api = process.env.DEV_URL;
const errorHandler = require('../middleware/errorHandler');
const userController = require('../controllers/user.controller');


const { User } = require('../schemas & model/userSchema');

// use middleware

// app.use('/uploads', express.static('public/uploads'));

// //upload profile picture
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });

//GET user profile
router.get(`${api}/profile`, requireAuth, userController.getUserProfileController);

// edit user profile data
router.patch(`${api}/editprofile`, requireAuth, userController.editUserProfileController);


// get user specific cart data
router.get(`${api}/cart`, requireAuth, userController.getCartController);

// add user address
router.post(`${api}/add/address`, requireAuth, userController.addUserAddressController);

// router.post(`${api}/upload/profile-picture`, requireAuth, upload.single('profilePicture'), async (req, res) => {
//     try {

//         const user = req.user; // 🔥 get user from req.user set in requireAuth middleware
//         if (!user) return res.status(404).json({ message: "User not found" });

//         user.profilePicture = `/uploads/${req.file.filename}`;
//         await user.save();

//         res.status(200).json({ message: "Profile picture uploaded successfully" });
//     } catch (err) {
//         console.error(err);
//         errorHandler(err);
//         res.status(500).json({ message: 'Failed to upload profile picture' });
//     }
// });

// // Get user profile
// router.get(`${api}/profile`, requireAuth, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId);

//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.status(200).json(user);
//     } catch (err) {
//         console.error(err);
//         errorHandler(err);
//         res.status(500).json({ message: 'Failed to fetch profile' });
//     }
// });

// // Edit profile
// router.patch(`${api}/editprofile`, requireAuth, async (req, res) => {
//     const { userId, name, email } = req.body;

//     try {
//         const userId = req.user.id; // 🔥 get user ID from req.user set in requireAuth middleware
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         user.name = name || user.name;
//         user.email = email || user.email;

//         await user.save();

//         res.status(200).json({
//             message: "Profile updated successfully",
//             user
//         });
//     } catch (err) {
//         console.error(err);
//         errorHandler(err);
//         res.status(500).json({ message: 'Failed to update profile' });
//     }
// });

// Add Delivery Address
// router.post(`${api}/add/address`, requireAuth, async (req, res) => {
//     const { userId, address } = req.body;

//     try {
//         const userId = req.user.id; // 🔥 get user ID from req.user set in requireAuth middleware
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         user.address.push(address);
//         await user.save();

//         res.status(200).json({
//             message: "Address added successfully",
//             address: user.address
//         });
//     } catch (err) {
//         console.error(err);
//         errorHandler(err);
//         res.status(500).json({ message: 'Failed to add address' });
//     }
// });

// //GET /cart
// router.get(`${api}/cart`, requireAuth, async (req, res) => {
//     try {
//         const user = req.user; // 🔥 get user from req.user set in requireAuth middleware
//         if (!user) return res.status(404).json({ message: "User not found" });
//         const cartList = await User.find({ userId: req.user._id }).populate('products.productId');
//         res.status(201).json(cartList);


//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
module.exports = router;