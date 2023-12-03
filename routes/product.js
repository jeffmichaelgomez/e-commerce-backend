const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth");

//route for getting all users (ADMIN ONLY)
router.get("/admin", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController
		.getAllProduct(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.get("/", (req, res) => {
	productController
		.getActiveProduct(req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.get("/:id", (req, res) => {
	productController
		.getProduct(req.params.id, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.post("/", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController
		.registerProduct(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.put("/:id", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController
		.updateProduct(userData, req.params.id, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.put("/:id/archive", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController
		.archiveProduct(userData, req.params.id)
		.then((resultFromController) => res.send(resultFromController));
});

router.put("/:id/restock", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController
		.restockProduct(userData, req.params.id)
		.then((resultFromController) => res.send(resultFromController));
});

module.exports = router;
