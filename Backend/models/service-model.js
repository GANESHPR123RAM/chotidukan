const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    product: { type: String, required: true },
    price: { type: String, required: true },
    offer: { type: String, required: true },
    urlToImage: { type: String, required: true },
})


const Service = new model("Service" , serviceSchema);

module.exports = Service;

