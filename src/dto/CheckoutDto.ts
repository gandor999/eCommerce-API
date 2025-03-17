import { Types } from "mongoose"

export class CheckoutDto extends Document {
    amount: number
    productName: string
    price: number
    productId: Types.ObjectId
}