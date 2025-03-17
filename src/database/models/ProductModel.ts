import { Model, Schema, model } from 'mongoose'
import { ProductDto } from '../../dto/ProductDto.js'
import { IModel } from '../../interfaces/IModel.js'

export class ProductModel implements IModel<Model<ProductDto>> {
  private static instance = new ProductModel()
  private model: Model<ProductDto>

  constructor() {
    const productSchema = new Schema<ProductDto>({
      name: {
        type: String,
        required: [true, `Product name is required`],
      },

      description: {
        type: String,
        required: [true, `Description is required`],
      },

      price: {
        type: Number,
        required: [true, `Price is required`],
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      createdOn: {
        type: Date,
        default: new Date(),
      },
    })

    this.model = model<ProductDto>('Product', productSchema)
  }

  public static getInstance(): ProductModel {
    return this.instance
  }

  public getModel() {
    return this.model
  }
}