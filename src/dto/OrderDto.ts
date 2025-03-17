import { Types } from "mongoose"
import { CheckoutDto } from "./CheckoutDto.js"

export class OrderDto extends Document {
    totalPrice: number
    totalAmount: number
    purchasedOn: Date
    userId: Types.ObjectId
    items: CheckoutDto[]
}