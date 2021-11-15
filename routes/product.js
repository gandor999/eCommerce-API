const express = require("express");
const router = express.Router();
const productController = require('../controllers/product');
const auth = require('../auth');


// Create product
router.post("/", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	productController.createProduct(req.body, userData.isAdmin)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});



// Get all active products
router.get("/", auth.verify, (req, res) => {
	productController.getAllActive()
	.then(resultFromController => {
		res.send(resultFromController)
	});
});


// Get one product
router.get("/:productId", auth.verify, (req, res) => {
	productController.getOneProduct(req.params.productId)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});



// Update product info
router.put("/:productId", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController.updateProduct(req.params.productId, req.body, userData.isAdmin)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});


// Archive product
router.put("/:productId/archive", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	productController.archiveProduct(req.params.productId, userData.isAdmin)
	.then(resultFromController => {
		res.send(resultFromController)
	});
});



module.exports = router;

