export class ECommerceApiError extends Error {
    constructor(e, statusCode) {
        super(e.message);
        this.statusCode = statusCode;
        this.name = "ECommerceApiError";
    }
    getStatusCode() {
        return this.statusCode;
    }
}
