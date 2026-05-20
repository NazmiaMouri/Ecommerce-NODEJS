import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import  Dress  from "../schemas & model/productSchema.js";
import ProductController from "../controllers/product.controller.js";
import cookieParser from "cookie-parser";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";
import { api } from "../utils/environment_variables.js";

//Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


//Get all products
router.get(`${api}/dresses`, requireAuth, ProductController.getAllDressesController);

//Get a specific product
router.get(`${api}/dress/:productId`, requireAuth, ProductController.getDressByIdController);

//Create a new product
router.post(`${api}/dress`, requireAuth, upload.single('image'), ProductController.createDressController);



// //get All dresses
// router.get(`${api}/dresses`, requireAuth, async (req, res) => {
//     console.log(req.body);

//     try {
//         const result = await Dress.find();
//         console.log(result);
//         res.send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err });
//     }
// }


// );

// // get the specific dress
// router.get(`${api}/dress/:productId`, requireAuth, (req, res) => {
//     try {
//         console.log(req.params.productId);
//         const productId = req.params.productId;
//         const dress = Dress.findOne(productId);
//         if (!dress) {
//             return res.status(404).json({ message: "Dress not found" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err });
//     }





// });

// // post a dress to database
// router.post(`${api}/dress`, upload.single('image'), (req, res) => {
//     res.send(req.body)
//     // res.send(fs.readFileSync())
//     const product = new Dress({
//         title: req.body.name,
//         image: fs.readFileSync(req.file.path),
//         body: req.body.body,
//         countInStock: req.body.countInStock,
//         favourite: req.body.favourite,
//         price: req.body.price
//     })

//     product.save().then((createdProduct) => {
//         res.status(201).json(createdProduct);
//     }).catch((err) => {
//         console.log(err)
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })



// })
export default router;