import { Application, NextFunction, Request, RequestHandler, Response } from "express"
import { ErrorHandler } from "../error_handling/ErrorHandler.js"
import express from 'express'
import cors from 'cors'
import { getUserRoute } from "../routes/user.js"
import { getProductRoute } from "../routes/product.js"
import { SuccessDto } from "../dto/success/SuccessDto.js"

function sameLetters(word1, word2) {
  let count1 = 0
  let count2 = 0
  let N = 0

  if (word1.length > word2.length) {
    N = word1.length
  } else if (word2.length > word1.length) {
    N = word2.length
  } else {
    N = word1.length
  }

  for (let i = 0; i < N; ++i) {
    if (word2.includes(word1[i])) {
      count1 += 1
    }
  }

  for (let i = 0; i < N; ++i) {
    if (word1.includes(word2[i])) {
      count2 += 1
    }
  }

  if (count1 == count2) {
    return true
  } else {
    return false
  }
}

export const requestWrapper = (fn: RequestHandler): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.getInstance().setGlobalResponse(res)
  Promise.resolve(fn(req, res, next)).catch(err => {
    next(err)
  })
}

export function responseWrapper(res: Response, successDto: SuccessDto) {
  res.json(successDto).status(successDto.statusCode)
}

export function initServer(server: Application) {
  server.use(express.json())
  server.use(cors())
  server.use(express.urlencoded({ extended: true }))

  // All users routes
  server.use('/users', getUserRoute())

  // All products routes
  server.use('/products', getProductRoute())

  ErrorHandler.getInstance().registerMiddlerWareErrorHandler(server)
}

console.log(sameLetters('word-word', 'worqword'))
