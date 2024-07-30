const express = require("express");
const { addToCartController, orderData, deleteOrderById } = require("../Controllers/addToCart-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/addToCart").post(authMiddleware, addToCartController);
router.route("/orders").get(authMiddleware, orderData); // Protected route
// router.route("/orders/delete/:id").delete(authMiddleware,  deleteOrderById);


module.exports = router;
