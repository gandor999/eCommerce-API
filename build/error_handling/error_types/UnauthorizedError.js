import { ECommerceApiError } from "./ECommerceApiError.js";
export class UnauthorizedError extends ECommerceApiError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "UnauthorizedError";
    }
}
