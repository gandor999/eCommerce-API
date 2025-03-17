import { Router } from 'express'
import { registerUser, loginUser, setAdmin } from '../controllers/user.js'
import { checkout, getMyOrders, getAllOrders } from '../controllers/order.js'
import { verify, decode } from '../security/auth.js'
import { requestWrapper, responseWrapper } from '../util/util.js'
import { UserDTO } from '../dto/UserDto.js'
import mongoose from 'mongoose'
import { UnauthorizedError } from '../error_handling/error_types/UnauthorizedError.js'
import { InvalidInputError } from '../error_handling/error_types/InvalidInputError.js'

export function getUserRoute(): Router {
  const router = Router()

  // Register user
  router.post(
    '/register',
    requestWrapper((req, res) => {
      registerUser(req.body).then(success => {
        responseWrapper(res, success)
      })
    })
  )

  // Login suer
  router.post(
    '/login',
    requestWrapper((req, res) => {
      loginUser(req.body).then(success => {
        responseWrapper(res, success)
      })
    })
  )

  // Set user to admin or not
  router.put(
    '/setAsAdmin',
    verify,
    requestWrapper((req, res) => {
      const userData: UserDTO = decode(req.headers.authorization)
      const queryParam: any = req.query

      if(!queryParam.userId || typeof queryParam.userId !== "string") {
        throw new InvalidInputError("User Id should be string and is required");
      }

      if (!userData) {
        throw new UnauthorizedError("User is not authorized to set admin")
      }

      if (!mongoose.Types.ObjectId.isValid(queryParam.userId)) {
        throw new InvalidInputError("Not a valid user id")
      }

      setAdmin(queryParam.userId, userData.isAdmin).then(resultFromController => {
        res.send(resultFromController)
      })
    })
  )

  // Create order for user
  router.post('/checkout', verify, requestWrapper((req, res) => {
    const userData = decode(req.headers.authorization)
    checkout(req.body, userData).then(resultFromController => {
      res.send(resultFromController)
    })
  }))

  // Get all orders associated with authenticated user
  router.get('/myOrders', verify, requestWrapper((req, res) => {
    const userData = decode(req.headers.authorization)
    getMyOrders(userData).then(resultFromController => {
      res.send(resultFromController)
    })
  }))

  // Get all orders
  router.get('/orders', verify, requestWrapper((req, res) => {
    const userData = decode(req.headers.authorization)
    getAllOrders(userData).then(resultFromController => {
      res.send(resultFromController)
    })
  }))

  return router
}
