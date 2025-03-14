export class ECommerceApiError extends Error {
    constructor(e: Error, private statusCode: number) {
        super(e.message)
        this.name = "ECommerceApiError"
    }

    public getStatusCode(): number {
        return this.statusCode
    }
}