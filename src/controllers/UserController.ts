import { Router } from 'express'
import { UserService } from '../services/UserService.js'
import { checkout, getMyOrders, getAllOrders } from '../services/order.js'
import { verify, decode } from '../security/auth.js'
import { requestWrapper, responseWrapper } from '../util/util.js'
import { IUserController } from './IUserController.js'

export class UserController implements IUserController {
  private static userController: IUserController = new UserController()
  private static Router = Router()
  private userService = UserService.getUserService()

  constructor() {
    // Register user
    UserController.Router.post(
      '/register',
      requestWrapper((req, res) => {
        this.userService.registerUser(req.body).then(success => {
          responseWrapper(res, success)
        })
      })
    )

    // Login user
    UserController.Router.post(
      '/login',
      requestWrapper((req, res) => {
        this.userService.loginUser(req.body).then(success => {
          responseWrapper(res, success)
        })
      })
    )

    // Set user to admin or not
    UserController.Router.put(
      '/setAsAdmin',
      verify,
      requestWrapper((req, res) => {
        this.userService.setAdmin(req).then(success => {
          res.send(success)
        })
      })
    )

    // Create order for user
    UserController.Router.post('/checkout', verify, requestWrapper((req, res) => {
      const userData = decode(req.headers.authorization)
      checkout(req.body, userData).then(success => {
        res.send(success)
      })
    }))

    // Get all orders associated with authenticated user
    UserController.Router.get('/myOrders', verify, requestWrapper((req, res) => {
      const userData = decode(req.headers.authorization)
      getMyOrders(userData).then(success => {
        res.send(success)
      })
    }))

    // Get all orders
    UserController.Router.get('/orders', verify, requestWrapper((req, res) => {
      const userData = decode(req.headers.authorization)
      getAllOrders(userData).then(success => {
        res.send(success)
      })
    }))
  }

  getUserRoutes(): Router {
    return UserController.Router
  }

  public static getInstance(): IUserController {
    return this.userController
  }
}
