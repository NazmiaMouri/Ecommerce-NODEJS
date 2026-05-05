const { Dress } = require("../schemas & model/productSchema");

//GET ALL DRESSES
async function getAllDressesService() {
    try {
        const dresses = await Dress.find();
        return dresses;
    } catch (err) {
        throw new Error(err);
    }
}

//GET A DRESS
async function getDressByIdService(productId) {
    try {
        const dress = await Dress.findOne({ _id: productId });
        if (!dress) {
            throw new Error("Dress not found");
        }
        return dress;
    } catch (err) {
        throw new Error(err);
    }
}  

//POST A DRESS TO DB
async function createDressService(dressData) {
    try {
        const dress = await Dress.create(dressData);
        return dress;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getAllDressesService,
    getDressByIdService,
    createDressService
};