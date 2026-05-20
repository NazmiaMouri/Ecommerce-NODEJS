import Dress from "../schemas & model/productSchema.js";
import AppError from "../utils/AppError.js";

//GET ALL DRESSES
async function getAllDressesService() {
    return await Dress.find();

}

//GET A DRESS
async function getDressByIdService(productId) {
    if (!productId) {
        throw new AppError('Invalid product id', 400);

    }
    return await Dress.findOne({ _id: productId });
}



    //POST A DRESS TO DB
    async function createDressService(dressData) {
        return dress = await Dress.create(dressData);

    }
          

    export default {
        getAllDressesService,
        getDressByIdService,
        createDressService
    };