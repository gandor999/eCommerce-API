export class ECommerceApiError extends Error {
    constructor(message) {
        super(message);
        this.name = "ECommerceApiError";
    }
    getStatusCode() {
        return this.statusCode;
    }
}
