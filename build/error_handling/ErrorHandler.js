import { ECommerceApiError } from "./error_types/ECommerceApiError.js";
export class ErrorHandler {
    static getInstance() {
        return this.instance;
    }
    registerMiddlerWareErrorHandler(server) {
        server.use((err, req, res, next) => {
            if (err instanceof ECommerceApiError) {
                return res.status(err.getStatusCode() || 500).json({
                    error: err.name || "InternalServerError",
                    message: err.message || "Something went wrong",
                    statusCode: err.getStatusCode || 500
                });
            }
            console.error("[Unhandled Error]:", err);
            res.status(500).json({
                error: "InternalServerError",
                message: "An unexpected error occurred.",
                statusCode: 500
            });
        });
    }
    // maybe pass in app here so that the api can return a response to the user as well
    handleErrors(e) {
        if (e instanceof Error) {
            console.error(JSON.stringify({
                errorName: e.name,
                errorMessage: e.message,
            }, null, 2));
            console.error("Error stack: ");
            e.stack.split("\n").forEach((s) => {
                console.error(s);
            });
        }
        else {
            console.error(JSON.stringify(e, null, 2));
        }
    }
}
ErrorHandler.instance = new ErrorHandler();
