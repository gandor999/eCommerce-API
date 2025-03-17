// Testing
import { Model, Schema, Types, model } from 'mongoose'
import { OrderDto } from '../../dto/OrderDto.js'
import { IModel } from '../../interfaces/IModel.js'

export class OrderModel implements IModel<Model<OrderDto>> {
  private static instance = new OrderModel()
  private model: Model<OrderDto>

  constructor() {
    const orderSchema = new Schema<OrderDto>({
      totalPrice: {
        type: Number,
        required: [true, `Total price is required`],
      },
    
      totalAmount: {
        type: Number,
        required: [true, `Total amount is required`],
      },
    
      purchasedOn: {
        type: Date,
        default: new Date(),
      },
    
      userId: {
        type: Schema.Types.ObjectId,
        required: [true, `UserId is required`],
      },
    
      items: [
        {
          price: {
            type: Number,
            required: [true, `Price is required`],
          },
    
          amount: {
            type: Number,
            required: [true, `Amount is required`],
          },
    
          productName: {
            type: String,
            required: [true, `Product name required`],
          },
    
          productId: {
            type: String,
            required: [true, `ProducId required`],
          },
        },
      ],
    })

    this.model = model('Order', orderSchema)
  }

  public static getInstance() {
    return this.instance
  }

  public getModel() {
    return this.model
  }
}