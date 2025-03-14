import { ECommerceApiError } from "./ECommerceApiError.js";
export class InvalidInputError extends ECommerceApiError {
    constructor(message) {
        super(message);
        this.statusCode = 406;
        this.name = "InvalidInputError";
    }
}
