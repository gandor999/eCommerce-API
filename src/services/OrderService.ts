
import { Request } from 'express'
import { ProductModel } from '../database/models/ProductModel.js'
import { decode } from '../security/auth.js'
import { UnauthorizedError } from '../error_handling/error_types/UnauthorizedError.js'
import { OrderModel } from '../database/models/OrderModel.js'
import { SuccessDto } from '../dto/success/SuccessDto.js'
import { CheckoutDto } from '../dto/CheckoutDto.js'
import { ProductExistsError } from '../error_handling/error_types/ProductExistsError.js'
import { IOrderService } from '../interfaces/IOrderService.js'

export class OrderService implements IOrderService {
  private static instance: IOrderService = new OrderService()
  private orderModel = OrderModel.getInstance().getModel()
  private productModel = ProductModel.getInstance().getModel()

  constructor() { }

  public static getInstance() {
    return this.instance
  }

  async getMyOrders(req: Request): Promise<SuccessDto> {
    const user = decode(req.headers.authorization)

    if (user.isAdmin) {
      throw new UnauthorizedError("Admin cannot make orders, hence no orders to get");
    }

    return this.orderModel.find({ userId: user._id }).then(rs => new SuccessDto(
      rs
      , 200))
  }

  async getAllOrders(req: Request): Promise<SuccessDto> {
    const user = decode(req.headers.authorization)

    if (!user.isAdmin) {
      throw new UnauthorizedError("Admin authority only");
    }

    return this.orderModel.find({}).then(rs => new SuccessDto(
      rs
      , 200))
  }

  async checkout(req: Request): Promise<SuccessDto> {
    const user = decode(req.headers.authorization)
    const checkoutDto: CheckoutDto[] = req.body

    if (user.isAdmin) {
      throw new UnauthorizedError("Admin is not allowed to checkout");
    }

    const productNotExist: string[] = []
    let sumAmount = 0
    let sumPrice = 0

    for (let i = 0; i < checkoutDto.length; ++i) {
      await this.productModel.findOne({
        $and: [{ name: checkoutDto[i].productName }, { isActive: true }],
      }).then(result => {
        if (!result) {
          productNotExist.push(checkoutDto[i].productName)
          return
        }

        checkoutDto[i].price = result.price
        sumPrice += result.price * checkoutDto[i].amount
        checkoutDto[i].productId = result._id
      })

      sumAmount += checkoutDto[i].amount
    }

    if (productNotExist.length > 0) {
      throw new ProductExistsError("These products do not exist: [" + productNotExist.join(", ") + "]");
    }

    const newOrder = new this.orderModel({
      totalPrice: sumPrice,
      totalAmount: sumAmount,
      userId: user._id,
      items: checkoutDto,
    })

    return newOrder.save().then(newOrder => {
      return new SuccessDto({
        message: "New order was created",
        totalPrice: newOrder.totalPrice,
        totalAmount: newOrder.totalAmount,
        userId: newOrder.userId,
        items: newOrder.items
      }, 200)
    })
  }
}
