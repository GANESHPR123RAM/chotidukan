const { Schema, model } = require("mongoose");

const addToCartSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  streetaddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  items: [
    {
      urlToImage: String,
      product: String,
      price: String,
      offer: String,
      // quantity: String, // Added if you are tracking quantities
    }
  ],
  totalPrice: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const addToCart = model("addToCart", addToCartSchema);
module.exports = addToCart;
