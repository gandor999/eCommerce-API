import { Request } from 'express'
import { SuccessDto } from '../dto/success/SuccessDto.js'
import { decode } from '../security/auth.js'
import { UnauthorizedError } from '../error_handling/error_types/UnauthorizedError.js'
import { ProductDto } from '../dto/ProductDto.js'
import { ProductExistsError } from '../error_handling/error_types/ProductExistsError.js'
import { InvalidInputError } from '../error_handling/error_types/InvalidInputError.js'
import { IProductService } from '../interfaces/IProductService.js'
import mongoose from 'mongoose'
import { ProductModel } from '../database/models/ProductModel.js'

export class ProductService implements IProductService {
  private static instance: IProductService = new ProductService()
  private productModel = ProductModel.getInstance().getModel()

  constructor() { }

  public static getInstance() {
    return this.instance
  }

  async createProduct(req: Request): Promise<SuccessDto> {
    const isAdmin = decode(req.headers.authorization).isAdmin
    const productDto: ProductDto = req.body

    if (!isAdmin) {
      throw new UnauthorizedError("Admin authority only");
    }

    const foundProduct: ProductDto = await this.productModel.findOne({ name: productDto.name })

    if (foundProduct) {
      throw new ProductExistsError(`There is already a product named "${foundProduct.name}"`);
    }

    const productDocument = new this.productModel({
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
    })

    return productDocument.save().then(() => {
      return new SuccessDto(productDto, 201)
    })
  }

  async getAllActive(): Promise<SuccessDto> {
    const productDocument = await this.productModel.find({ isActive: true })
    return new SuccessDto(productDocument.map(it => ({
      name: it.name,
      description: it.description,
      price: it.price
    } as ProductDto)), 200)
  }

  async getOneProduct(req: Request): Promise<SuccessDto> {
    const queryParam: any = req.query

    if (!queryParam.productId || typeof queryParam.productId !== "string") {
      throw new InvalidInputError("Product Id should be string and is required");
    }

    if (!mongoose.Types.ObjectId.isValid(queryParam.productId)) {
      throw new InvalidInputError("Product Id is not valid");
    }

    return this.productModel.findOne({ _id: queryParam.productId }).then(it => new SuccessDto({
      name: it.name,
      description: it.description,
      price: it.price
    } as ProductDto, 200))
  }

  async updateProduct(req: Request): Promise<SuccessDto> {
    const queryParam: any = req.query
    const isAdmin = decode(req.headers.authorization).isAdmin

    if (!queryParam.productId || typeof queryParam.productId !== "string") {
      throw new InvalidInputError("Product Id should be string and is required");
    }

    if (!mongoose.Types.ObjectId.isValid(queryParam.productId)) {
      throw new InvalidInputError("Product Id is not valid");
    }

    if (!isAdmin) {
      throw new UnauthorizedError("Admin authority only");
    }

    const productDto: ProductDto = req.body

    const update = {
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
    }

    return this.productModel.findByIdAndUpdate(queryParam.productId, update).then(_ => {
      return new SuccessDto({
        message: "Successfully updated",
        ...productDto
      }, 201)
    })
  }

  async archiveProduct(req: Request): Promise<SuccessDto> {
    const queryParam: any = req.query
    const isAdmin = decode(req.headers.authorization).isAdmin

    if (!queryParam.productId || typeof queryParam.productId !== "string") {
      throw new InvalidInputError("Product Id should be string and is required");
    }

    if (!mongoose.Types.ObjectId.isValid(queryParam.productId)) {
      throw new InvalidInputError("Product Id is not valid");
    }

    if (!isAdmin) {
      throw new UnauthorizedError("Admin authority only");
    }

    const update = {
      isActive: false,
    }

    return this.productModel.findByIdAndUpdate(queryParam.productId, update).then(item => {
      return new SuccessDto({
        message: "Product has been archived",
        ... {
          name: item.name,
          description: item.description,
          price: item.price
        }
      }, 201)
    })
  }
}