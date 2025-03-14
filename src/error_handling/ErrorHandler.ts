import { Application, Response } from "express";
import { ECommerceApiError } from "./error_types/ECommerceApiError.js";
import { Error } from "mongoose";
import { InternalServerError } from "./error_types/InternalServerError.js";

export class ErrorHandler {
    private static instance = new ErrorHandler()
    private globalResponse: Response // this is for unhandled exceptions that express app.use can't catch

    public static getInstance() {
        return this.instance
    }

    public registerMiddlerWareErrorHandler(server: Application) {
        server.use((err, req, res, next) => {
            if (err instanceof ECommerceApiError) {
                return res.status(err.getStatusCode() || 500).json({
                    error: err.name || "InternalServerError",
                    message: err.message || "Something went wrong",
                    statusCode: err.getStatusCode() || 500
                })
            }

            res.status(500).json({
                error: "InternalServerError",
                message: "An unexpected error occurred.",
                statusCode: 500
            });
        });
    }

    // maybe pass in app here so that the api can return a response to the user as well
    public handleErrors(e: Error) {
        let response = {
            errorName: e.name,
            errorMessage: e.message,
            statusCode: 500
        }

        if (e instanceof ECommerceApiError) {
            response.statusCode = e.getStatusCode()
        }

        this.globalResponse.status(response.statusCode).json(response)
        this.logForDebugging(e)
    }

    public setGlobalResponse(responseObj: Response) {
        this.globalResponse = responseObj
    }

    public listenToUnhandledErrors() {
        process.on('uncaughtException', error => {
            console.log('Uncaught Exception detected!')
            ErrorHandler.getInstance().handleErrors(error)
        })

        process.on('unhandledRejection', reason => {
            console.log('Unhandled Promise Rejection detected!')
            if (reason instanceof Error) {
                ErrorHandler.getInstance().handleErrors(reason)
                return
            }

            ErrorHandler.getInstance().handleErrors(new InternalServerError("A promise was rejected"))
        })
    }

    private logForDebugging(e: Error) {
        console.error(JSON.stringify({
            errorName: e.name,
            errorMessage: e.message
        }, null, 2))
        console.error("Error stack: ")
        e.stack.split("\n").forEach((s) => {
            console.error(s)
        })
    }
}