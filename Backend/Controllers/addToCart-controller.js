const addToCart = require("../models/addToCart-model");

const addToCartController = async (req, res, next) => {
  try {
    console.log('Request Body:', req.body);
    const { username, email, phone, country, streetaddress, city, cartItems, totalPrice, state, pinCode } = req.body;

    const order = await addToCart.create({
      username,
      email,
      phone,
      country,
      streetaddress,
      city,
      state,
      pinCode,
      items: cartItems,
      totalPrice,
    });

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// order data logic
const orderData = async (req, res) => {
  try {
    const userEmail = req.user.email; // Changed: Use req.user.email to query orders by the logged-in user
    const userOrders = await addToCart.find({ email: userEmail }); // Changed: Find orders by user email
    console.log(userOrders);
    return res.status(200).json({ orderData: userOrders });
  } catch (error) {
    console.log(`error from the user route ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
}

// const deleteOrderById = async (req, res) => {
//   try {
//       const id = req.params.id;
//       await addToCart.deleteOne({ _id: id });
//       return res.status(200).json({ message: "order cancelled Successfully" });
//   } catch (error) {
//       next(error);
//   }
// }

module.exports = { addToCartController, orderData };
