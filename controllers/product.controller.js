const productService = require('../services/product.service');



//GET ALL DRESSES
const getAllDressesController = async (req, res) => {
    try {
        const dresses = await productService.getAllDresses();
        res.status(200).json(dresses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch dresses' });
    }
}

//GET A DRESS
const getDressByIdController = async (req, res) => {
    const { productId } = req.params;
    try {
        const dress = await productService.getDressById(productId);
        if (!dress) return res.status(404).json({ message: "Dress not found" });

        res.status(200).json(dress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch dress' });
    }
}

//POST A DRESS TO DB
const createDressController = async (req, res) => {
    try {
        const dressData = req.body;
        dressData.image = `/uploads/${req.file.filename}`; // Assuming the image is uploaded and the filename is available in req.file  
        const dress = await productService.createDress(dressData);
        res.status(201).json(dress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create dress' });
    }
}

module.exports = {
    getAllDressesController,
    getDressByIdController,
    createDressController
};