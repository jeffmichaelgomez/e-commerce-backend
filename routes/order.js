const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const auth = require("../auth");

//add to cart
router.post("/addToCart", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.orderProduct(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

//get all orders
router.get("/users/orders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.getAllOrders(userData)
		.then((resultFromController) => res.send(resultFromController));
});

//get myOrder
router.get("/myOrders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.getMyOrders(userData)
		.then((resultFromController) => res.send(resultFromController));
});

router.post("/increaseQuantity", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.increaseQuantity(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.post("/decreaseQuantity", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.decreaseQuantity(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.post("/removeOneProduct", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.removeOneProduct(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.post("/checkOut", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController
		.checkOut(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

module.exports = router;
