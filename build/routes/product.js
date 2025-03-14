import { Router } from 'express';
import { createProduct, getAllActive, getOneProduct, updateProduct, archiveProduct, } from '../controllers/product.js';
import { verify, decode } from '../security/auth.js';
export function getProductRoute() {
    const router = Router();
    // Create product
    router.post('/', verify, (req, res) => {
        const userData = decode(req.headers.authorization);
        createProduct(req.body, userData.isAdmin).then(resultFromController => {
            res.send(resultFromController);
        });
    });
    // Get all active products
    router.get('/', verify, (req, res) => {
        getAllActive().then(resultFromController => {
            res.send(resultFromController);
        });
    });
    // Get one product
    router.get('/:productId', verify, (req, res) => {
        getOneProduct(req.params.productId).then(resultFromController => {
            res.send(resultFromController);
        });
    });
    // Update product info
    router.put('/:productId', verify, (req, res) => {
        const userData = decode(req.headers.authorization);
        updateProduct(req.params.productId, req.body, userData.isAdmin).then(resultFromController => {
            res.send(resultFromController);
        });
    });
    // Archive product
    router.put('/:productId/archive', verify, (req, res) => {
        const userData = decode(req.headers.authorization);
        archiveProduct(req.params.productId, userData.isAdmin).then(resultFromController => {
            res.send(resultFromController);
        });
    });
    return router;
}
