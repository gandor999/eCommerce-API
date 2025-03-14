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
import Order from '../database/models/Order.js';
// Get user's orders
export function getMyOrders(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.isAdmin) {
            return Order.find({ userId: data.id }).then(result => {
                if (result.length == 0) {
                    return `You have no pending orders`;
                }
                else {
                    return result;
                }
            });
        }
        else {
            return `Admin cannot make orders, hence no orders to get`;
        }
    });
}
// Get all orders made
export function getAllOrders(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (data.isAdmin) {
            return Order.find({}).then(result => {
                if (result.length == 0) {
                    return `There are no pending orders`;
                }
                else {
                    return result;
                }
            });
        }
        else {
            return `Admin authority only`;
        }
    });
}
// Checkout
export function checkout(data, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!user.isAdmin) {
                let isExist = true;
                let productNotExist = [];
                let sumAmount = 0;
                let sumPrice = 0;
                for (let i = 0; i < data.length; ++i) {
                    data[i].productId = yield Product.findOne({
                        $and: [{ name: data[i].productName }, { isActive: true }],
                    }).then(result => {
                        if (!result) {
                            isExist = false;
                            productNotExist.push(' ' + data[i].productName);
                            return false;
                        }
                        else {
                            data[i].price = result.price;
                            sumPrice += result.price * data[i].amount;
                            return result.id;
                        }
                    });
                    sumAmount += data[i].amount;
                }
                if (isExist == false) {
                    return `No active product exist for the following product name: ${productNotExist}\nNo order created`;
                }
                else {
                    let newOrder = new Order({
                        totalPrice: sumPrice,
                        totalAmount: sumAmount,
                        userId: user.id,
                        items: data,
                    });
                    return newOrder.save().then(newOrder => {
                        return `New order has been created with ticket no ${newOrder.id}`;
                    });
                }
            }
            else {
                return `Admin is not allowed to checkout`;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
