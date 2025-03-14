export class DatabaseNotConnectedException extends Error {
    constructor(errorMessage: string) {
        super(errorMessage);
        this.message = "Could not connect to database because: " + this.message
        this.name = "DatabaseNotConnectedException"
    }
}