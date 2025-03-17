import { Types } from "mongoose"

export class ProductDto extends Document {
    name: string
    description: string
    price: number
    isActive: boolean
    createdOn: Date
    _id: Types.ObjectId
}