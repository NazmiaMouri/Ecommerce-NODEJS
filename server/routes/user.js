const express = require('express');
const app = express();
const router = express.Router();
const { requireAuth } = require("../../middleware/authMiddleware");
const { Order } = require('../../schemas & model/orderSchema');
const cookieParser = require("cookie-parser");



const api = process.env.DEV_URL;
const errorHandler = require('../../middleware/errorHandler');

const express = require('express');
const { User } = require('../../schemas & model/userSchema');

// use middleware
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

//upload profile picture
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post(`${api}/upload/profile-picture`, requireAuth, upload.single('profilePicture'), async (req, res) => {
    try {

        const user = req.user; // 🔥 get user from req.user set in requireAuth middleware
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profilePicture = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({ message: "Profile picture uploaded successfully" });
    } catch (err) {
        console.error(err);
        errorHandler(err);
        res.status(500).json({ message: 'Failed to upload profile picture' });
    }
});

// Get user profile
router.get(`${api}/profile`, requireAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        errorHandler(err);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

// Edit profile
router.put(`${api}/editprofile`, requireAuth, async (req, res) => {
    const { userId, name, email } = req.body;

    try {
        const userId = req.user.id; // 🔥 get user ID from req.user set in requireAuth middleware
        const user = await User.findById(userId);   
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name || user.name;
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
});

// Add Delivery Address
router.post(`${api}/add/address`, requireAuth, async (req, res) => {
    const { userId, address } = req.body;

    try {
        const userId = req.user.id; // 🔥 get user ID from req.user set in requireAuth middleware
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.address.push(address);
        await user.save();

        res.status(200).json({
            message: "Address added successfully",
            address: user.address
        });
    } catch (err) {
        console.error(err);
        errorHandler(err);
        res.status(500).json({ message: 'Failed to add address' });
    }
});
// POST /cart/add
router.post(`${api}/cart/add`,
    requireAuth, async (req, res) => {
        const cart = null;
        try {
            const { productId, quantity = 1 } = req.body;
            const user = req.user; // 🔥 get user from req.user set in requireAuth middleware
            if (!user) return res.status(404).json({ message: "User not found" });

            // check if product already in cart
            const existingItem = user.cart.find(item =>
                item.productId.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart = user.cart.push({
                    productId,
                    quantity
                });
            }

            await user.save();

            res.status(200).json({
                message: "Added to cart successfully",
                cart: cart
            });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });


module.exports = router;