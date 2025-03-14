var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from '../database/models/Product.js';
// Create a product
export function createProduct(reqBody, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAdmin) {
            let isNewProduct = yield Product.findOne({ name: reqBody.name }).then(result => {
                if (!result) {
                    return true;
                }
                else {
                    return false;
                }
            });
            if (isNewProduct) {
                let newProduct = new Product({
                    name: reqBody.name,
                    description: reqBody.description,
                    price: reqBody.price,
                });
                return newProduct.save().then((promise, error) => {
                    if (error) {
                        return false;
                    }
                    else {
                        return `New product created`;
                    }
                });
            }
            else {
                return `There is already a product named "${reqBody.name}"`;
            }
        }
        else {
            return `Admin authority only`;
        }
    });
}
// Get all active products
export function getAllActive() {
    return Product.find({ isActive: true }).then(result => result);
}
// Get one product
export function getOneProduct(data) {
    return Product.findOne({ _id: data }).then(result => result);
}
// Update one product
export function updateProduct(productId, reqBody, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAdmin) {
            let update = {
                name: reqBody.name,
                description: reqBody.description,
                price: reqBody.price,
            };
            return Product.findByIdAndUpdate(productId, update).then((promise, error) => {
                if (error) {
                    return false;
                }
                else {
                    return `Product has been updated`;
                }
            });
        }
        else {
            return `Admin authority only`;
        }
    });
}
// Archive one product
export function archiveProduct(productId, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAdmin) {
            let update = {
                isActive: false,
            };
            return Product.findByIdAndUpdate(productId, update).then((promise, error) => {
                if (error) {
                    return false;
                }
                else {
                    return `Product has been archived`;
                }
            });
        }
        else {
            return `Admin authority only`;
        }
    });
}
