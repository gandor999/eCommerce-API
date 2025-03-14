export abstract class ECommerceApiError extends Error {
    protected statusCode: number

    constructor(message: string) {
        super(message)
        this.name = "ECommerceApiError"
    }

    public getStatusCode(): number {
        return this.statusCode
    }
}