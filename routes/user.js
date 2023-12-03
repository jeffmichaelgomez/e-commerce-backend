const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth");

//route for getting all users (ADMIN ONLY)
router.get("/users/list", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController
		.getUsers(userData, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

//route for registering a user
router.post("/register", (req, res) => {
	userController
		.registerUser(req.body)
		.then((resultFromController) => res.send(resultFromController));
});

//routes for authenticating a user
router.post("/login", (req, res) => {
	userController
		.loginUser(req.body)
		.then((resultFromController) => res.send(resultFromController));
});

//routes for setting a user to admin (ADMIN ONLY)
router.put("/:id/setAsAdmin", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController
		.setAdmin(userData, req.params.id, req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.post("/checkEmail", (req, res) => {
	userController
		.checkEmailExists(req.body)
		.then((resultFromController) => res.send(resultFromController));
});

router.get("/details", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController
		.getProfile(userData)
		.then((resultFromController) => res.send(resultFromController));
});

// Allows us to export the "router" object that will be accessed in "index.js"\
module.exports = router;
