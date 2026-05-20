import productService from "../services/product.service.js";
import { sendSuccess } from "../utils/responseHandler.js";



//GET ALL DRESSES
const getAllDressesController = async (req, res) => {

    const dresses = await productService.getAllDressesService();

    if (!dresses || dresses.length === 0) {
        sendSuccess(res, { statusCode: 200, message: 'No dress Found', data: { dresses } })

    } else {
        sendSuccess(res, { statusCode: 200, message: `${dresses.length} dressess found`, data:  dresses })

    }



}

//GET A DRESS
const getDressByIdController = async (req, res) => {
    const { productId } = req.params;

    const dress = await productService.getDressByIdService(productId);
    if (!dress || dress.length === 0) {
        sendSuccess(res, { statusCode: 200, message: 'No dress Found', data:  dress  })

    } else {
        sendSuccess(res, { statusCode: 200, message: `${dress.length} dressess found`, data:  dress  })

    }


}

//POST A DRESS TO DB
const createDressController = async (req, res) => {
    try {
        const dressData = req.body;
        dressData.image = `/uploads/${req.file.filename}`; // Assuming the image is uploaded and the filename is available in req.file  
        const dress = await productService.createDressService(dressData);
        res.status(201).json(dress);
    } catch (err) {-
        
        console.error(err);
        res.status(500).json({ message: 'Failed to create dress' });
    }
}

export default {
    getAllDressesController,
    getDressByIdController,
    createDressController
};