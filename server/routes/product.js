const express = require('express');
const { requireAuth } = require("../../middleware/authMiddleware");
const { Dress } = require('../../schemas & model/productSchema');
const cookieParser = require("cookie-parser");
const router = express.Router();
const api = process.env.DEV_URL;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cookieParser());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


//get All dresses
router.get(`${api}/dresses`, requireAuth, async (req, res) => {
    console.log(req.body);

    try {
        const result = await Dress.find();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
}


);

// get the specific dress
router.get(`${api}/dress/:productId`, requireAuth, (req, res) => {
    try {
        console.log(req.params.productId);
        const productId = req.params.productId;
        const dress = Dress.findOne(productId);
        if (!dress) {
            return res.status(404).json({ message: "Dress not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }





});

// post a dress to database
router.post(`${api}/dress`, upload.single('image'), (req, res) => {
    res.send(req.body)
    // res.send(fs.readFileSync())
    const product = new Dress({
        title: req.body.name,
        image: fs.readFileSync(req.file.path),
        body: req.body.body,
        countInStock: req.body.countInStock,
        favourite: req.body.favourite,
        price: req.body.price
    })

    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct);
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: err,
            success: false
        })
    })



})
module.exports = router;