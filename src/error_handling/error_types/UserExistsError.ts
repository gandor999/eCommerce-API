import { ECommerceApiError } from "./ECommerceApiError.js";

export class UserExistsError extends ECommerceApiError {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.name = "UserExistsError"
    }
}