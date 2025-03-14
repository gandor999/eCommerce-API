import { ECommerceApiError } from "./error_types/ECommerceApiError.js";
import { Error } from "mongoose";
import { InternalServerError } from "./error_types/InternalServerError.js";
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
                    statusCode: err.getStatusCode() || 500
                });
            }
            res.status(500).json({
                error: "InternalServerError",
                message: "An unexpected error occurred.",
                statusCode: 500
            });
        });
    }
    // maybe pass in app here so that the api can return a response to the user as well
    handleErrors(e) {
        let response = {
            errorName: e.name,
            errorMessage: e.message,
            statusCode: 500
        };
        if (e instanceof ECommerceApiError) {
            response.statusCode = e.getStatusCode();
        }
        this.globalResponse.status(response.statusCode).json(response);
        this.logForDebugging(e);
    }
    setGlobalResponse(responseObj) {
        this.globalResponse = responseObj;
    }
    listenToUnhandledErrors() {
        process.on('uncaughtException', error => {
            console.log('Uncaught Exception detected!');
            ErrorHandler.getInstance().handleErrors(error);
        });
        process.on('unhandledRejection', reason => {
            console.log('Unhandled Promise Rejection detected!');
            if (reason instanceof Error) {
                ErrorHandler.getInstance().handleErrors(reason);
                return;
            }
            ErrorHandler.getInstance().handleErrors(new InternalServerError("A promise was rejected"));
        });
    }
    logForDebugging(e) {
        console.error(JSON.stringify({
            errorName: e.name,
            errorMessage: e.message
        }, null, 2));
        console.error("Error stack: ");
        e.stack.split("\n").forEach((s) => {
            console.error(s);
        });
    }
}
ErrorHandler.instance = new ErrorHandler();
