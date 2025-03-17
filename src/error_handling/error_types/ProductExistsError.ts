import { ECommerceApiError } from "./ECommerceApiError.js";

export class ProductExistsError extends ECommerceApiError {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.name = "ProductExistsError"
    }
}