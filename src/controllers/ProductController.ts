import { Router } from 'express'
import { verify } from '../security/auth.js'
import { requestWrapper } from '../util/util.js'
import { IController } from '../interfaces/IController.js'
import { ProductService } from '../services/ProductService.js'

export class ProductController implements IController {
  private static productController: IController = new ProductController()
  private router = Router()
  private productService = ProductService.getInstance()

  constructor() {
    // Create product
    this.router.post('/', verify, requestWrapper((req, res) => {
      this.productService.createProduct(req).then(success => {
        res.send(success)
      })
    }))

    // Get all active products
    this.router.get('/all', verify, requestWrapper((_, res) => {
      this.productService.getAllActive().then(success => {
        res.send(success)
      })
    }))

    // Get one product
    this.router.get('/', verify, requestWrapper((req, res) => {
      // query params productId
      this.productService.getOneProduct(req).then(success => {
        res.send(success)
      })
    }))

    // Update product info
    this.router.put('/', verify, requestWrapper((req, res) => {
      this.productService.updateProduct(req).then(success => {
        res.send(success)
      })
    }))

    // Archive product
    this.router.put('/archive', verify, requestWrapper((req, res) => {
      this.productService.archiveProduct(req).then(success => {
        res.send(success)
      })
    }))
  }

  public static getInstance(): IController {
    return this.productController
  }

  getRoute(): Router {
    return this.router
  }
}
