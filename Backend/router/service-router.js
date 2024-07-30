const express = require("express");
const {services, postdata, deleteProductById} = require("../Controllers/service-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

router.route("/service").get(services);


router.route("/postdata").post(authMiddleware, adminMiddleware, postdata);
router.route("/services/delete/:id").delete(authMiddleware, adminMiddleware, deleteProductById);


module.exports = router;