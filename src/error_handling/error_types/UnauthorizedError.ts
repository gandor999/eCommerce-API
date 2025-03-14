import { ECommerceApiError } from "./ECommerceApiError.js";

export class UnauthorizedError extends ECommerceApiError {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
        this.name = "UnauthorizedError"
    }
}