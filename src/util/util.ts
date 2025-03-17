import { Application, RequestHandler, Response } from "express"
import { ErrorHandler } from "../error_handling/ErrorHandler.js"
import express from 'express'
import cors from 'cors'
import { UserController } from "../controllers/UserController.js"
import { ProductController } from "../controllers/ProductController.js"
import { SuccessDto } from "../dto/success/SuccessDto.js"

/**
 * Redirects all promise rejections and exceptions to the central error handler
 * 
 * @param fn - the middleware function for this route
 * @returns 
 */
export function requestWrapper(fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    ErrorHandler.getInstance().setGlobalResponse(res)
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export function responseWrapper(res: Response, successDto: SuccessDto) {
  res.json(successDto).status(successDto.statusCode)
}

export function initServer(server: Application) {
  server.use(express.json())
  server.use(cors())
  server.use(express.urlencoded({ extended: true }))

  // All users routes
  server.use('/users', UserController.getInstance().getRoute())

  // All products routes
  server.use('/products', ProductController.getInstance().getRoute())

  server.use('/', (req, res) => {
    res.send("Hello World")
  })

  ErrorHandler.getInstance().registerMiddlerWareErrorHandler(server)
}
