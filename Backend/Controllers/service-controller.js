const Service = require("../models/service-model");

const services = async (req, res) => {
    try {

        const response = await Service.find();
        if (!response) {
            res.status(404).json({ msg: "No service found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`services: $(error)`);
        res.status(500).json({ msg: "Server error" }); // Added a response for the server error
    }
}


const postdata = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        const { product, price, offer, urlToImage } = req.body;

        const productExist = await Service.findOne({ product, urlToImage }); // Check both product and urlToImage

        if (productExist) {
            return res.status(400).json({ msg: 'Product with this URL already exists' });
        }
        
        const ProductCreated = await Service.create({ product, price, offer, urlToImage });

        res.status(201).json({
            msg: "Data Post Successful",
        });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        await Service.deleteOne({ _id: id });
        return res.status(200).json({ message: "Product Deleted Successfuly" });
    } catch (error) {
        next(error);
    }
}

module.exports = { services, postdata, deleteProductById };