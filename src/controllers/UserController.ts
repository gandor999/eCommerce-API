import { Router } from 'express'
import { UserService } from '../services/UserService.js'
import { OrderService } from '../services/OrderService.js'
import { verify } from '../security/auth.js'
import { requestWrapper, responseWrapper } from '../util/util.js'
import { IController } from '../interfaces/IController.js'

export class UserController implements IController {
  private static userController: IController = new UserController()
  private router = Router()
  private userService = UserService.getUserService()
  private orderService = OrderService.getInstance()

  constructor() {
    // Register user
    this.router.post(
      '/register',
      requestWrapper((req, res) => {
        this.userService.registerUser(req.body).then(success => {
          responseWrapper(res, success)
        })
      })
    )

    // Login user
    this.router.post(
      '/login',
      requestWrapper((req, res) => {
        this.userService.loginUser(req.body).then(success => {
          responseWrapper(res, success)
        })
      })
    )

    // Set user to admin or not
    this.router.put(
      '/setAsAdmin',
      verify,
      requestWrapper((req, res) => {
        this.userService.setAdmin(req).then(success => {
          res.send(success)
        })
      })
    )

    // Create order for user
    this.router.post('/checkout', verify, requestWrapper((req, res) => {
      this.orderService.checkout(req).then(success => {
        res.send(success)
      })
    }))

    // Get all orders associated with authenticated user
    this.router.get('/myOrders', verify, requestWrapper((req, res) => {
      this.orderService.getMyOrders(req).then(success => {
        res.send(success)
      })
    }))

    // Get all orders
    this.router.get('/orders', verify, requestWrapper((req, res) => {
      this.orderService.getAllOrders(req).then(success => {
        res.send(success)
      })
    }))
  }
  getRoute(): Router {
    return this.router
  }

  public static getInstance(): IController {
    return this.userController
  }
}
