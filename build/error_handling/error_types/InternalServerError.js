import { ECommerceApiError } from "./ECommerceApiError.js";
export class InternalServerError extends ECommerceApiError {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = "InternalServerError";
    }
}
