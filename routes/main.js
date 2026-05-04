


const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');


const api = process.env.DEV_URL;

const { Dress } = require('../schemas & model/productSchema')
const UPLOAD_FOLDER = "../../public/uploads/";

// Multer configuration for file storage
const upload = multer({
    destination: UPLOAD_FOLDER,
    // filename: (req, file, cb) => {
    //     cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    // }
});

app.use(cookieParser())



module.exports = router;
