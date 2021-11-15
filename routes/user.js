const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const orderController = require('../controllers/order');
const auth = require('../auth');



// Register user
router.post("/register", (req, res) => {
	userController.registerUser(req.body)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});

// Login suer
router.post("/login", (req, res) => {
	userController.loginUser(req.body)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});



// Set user to admin or not
router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	userController.setAdmin(req.params.userId, userData.isAdmin)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});

// Create order for user
router.post("/checkout", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController.checkout(req.body, userData)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});



// Get all orders associated with authenticated user
router.get("/myOrders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController.getMyOrders(userData)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});



// Get all orders
router.get("/orders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	orderController.getAllOrders(userData)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});

module.exports = router;


